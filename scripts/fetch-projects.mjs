/**
 * Build-time script that powers the Projects section of the portfolio.
 *
 * Flow:
 *  1. Fetch public, non-fork repositories of GITHUB_USER that carry the
 *     `portfolio` GitHub topic (newest first).
 *  2. For each repo, collect its Markdown documentation (README.md and
 *     docs/* first, capped at MAX_MD_CHARS).
 *  3. Ask DeepSeek (`deepseek-chat`, the cheapest model) to write a short and
 *     a long description from that content.
 *  4. Merge everything into src/data/projects/generated.json, which the
 *     Next.js site imports at build time.
 *
 * Environment:
 *  - GITHUB_TOKEN      optional; raises GitHub API rate limits (use the
 *                      built-in ${{ github.token }} in Actions).
 *  - DEEPSEEK_API_KEY  optional; when missing, descriptions fall back to the
 *                      repository description so local builds still work.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.resolve(
  __dirname,
  '../src/data/projects/generated.json',
);

const GITHUB_USER = 'koraysrn';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

// Character budget for all collected Markdown per repository.
const MAX_MD_CHARS = 60_000;

const GITHUB_HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'koray-portfolio-build',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

async function githubJson(url) {
  const res = await fetch(url, { headers: GITHUB_HEADERS });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status} for ${url}: ${body.slice(0, 500)}`);
  }
  return res.json();
}

function encodePath(filePath) {
  return filePath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function humanizeTitle(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function getRepositories() {
  const query = `user:${GITHUB_USER}+topic:portfolio+fork:false`;
  const url =
    `https://api.github.com/search/repositories?q=${query}` +
    `&sort=updated&order=desc&per_page=100`;
  const data = await githubJson(url);
  return data.items ?? [];
}

async function listMarkdownFiles(repo) {
  const url =
    `https://api.github.com/repos/${GITHUB_USER}/${repo.name}/git/trees/` +
    `${repo.default_branch}?recursive=1`;
  const data = await githubJson(url);
  return (data.tree ?? [])
    .filter(
      (item) =>
        item.type === 'blob' && item.path.toLowerCase().endsWith('.md'),
    )
    .map((item) => item.path);
}

function priorityOf(filePath) {
  const lower = filePath.toLowerCase();
  if (lower === 'readme.md' || lower.endsWith('/readme.md')) return 0;
  if (lower.startsWith('docs/')) return 1;
  return 2;
}

async function collectMarkdown(repo, filePaths) {
  const sorted = [...filePaths].sort(
    (a, b) => priorityOf(a) - priorityOf(b),
  );

  let chunks = [];
  let total = 0;

  for (const filePath of sorted) {
    if (total >= MAX_MD_CHARS) break;

    try {
      const rawUrl =
        `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/` +
        `${repo.default_branch}/${encodePath(filePath)}`;
      const res = await fetch(rawUrl, {
        headers: { 'User-Agent': 'koray-portfolio-build' },
      });
      if (!res.ok) continue;

      const text = await res.text();
      const separator = `\n\n===== FILE: ${filePath} =====\n\n`;
      const remaining = MAX_MD_CHARS - total;

      let addition = separator + text;
      if (addition.length > remaining) {
        addition = addition.slice(0, remaining);
      }

      chunks.push(addition);
      total += addition.length;
    } catch {
      // Skip unreadable files and continue with the rest.
    }
  }

  return chunks.join('');
}

function buildTechnologies(repo) {
  const technologies = [];
  if (repo.language) technologies.push(repo.language);

  for (const topic of repo.topics ?? []) {
    if (topic === 'portfolio' || topic === 'in-progress') continue;
    if (!technologies.includes(topic)) technologies.push(topic);
  }

  return technologies;
}

function fallbackDescription(repo) {
  const description = repo.description || '';
  return {
    title: humanizeTitle(repo.name),
    shortDescription: description,
    fullDescription: description,
    technologies: buildTechnologies(repo),
  };
}

async function generateDescriptions(repo, markdown) {
  if (!DEEPSEEK_API_KEY) {
    return fallbackDescription(repo);
  }

  const prompt = [
    'You are helping populate a portfolio website for a developer.',
    'Given the information about a GitHub repository below, produce:',
    '1. "shortDescription": 1-2 sentences for a project card.',
    '2. "fullDescription": 2-4 sentences explaining what the project does,',
    '   its purpose, and notable technical highlights.',
    '3. "technologies": an array of 4-8 key technologies, languages,',
    '   frameworks and libraries actually used in the project, as short',
    '   names (e.g. "Python", "Next.js", "LangGraph").',
    '',
    'Respond with valid JSON only, using exactly this shape:',
    '{"shortDescription": "...", "fullDescription": "...",',
    '"technologies": ["...", "..."]}',
    '',
    `Repository name: ${repo.name}`,
    `GitHub description: ${repo.description || '(none)'}`,
    `Primary language: ${repo.language || '(unknown)'}`,
    `Topics: ${(repo.topics ?? []).join(', ') || '(none)'}`,
    '',
    'Markdown documentation (may be truncated):',
    markdown || '(no Markdown found)',
  ].join('\n');

  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content:
              'You are a precise technical writer. Always reply with valid JSON only.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 1000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      throw new Error(`DeepSeek API ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    const parsed = JSON.parse(content);

    return {
      title: humanizeTitle(repo.name),
      shortDescription:
        parsed.shortDescription || repo.description || '',
      fullDescription:
        parsed.fullDescription ||
        parsed.shortDescription ||
        repo.description ||
        '',
      technologies:
        Array.isArray(parsed.technologies) && parsed.technologies.length > 0
          ? parsed.technologies.filter(
              (tech) => typeof tech === 'string' && tech.trim().length > 0,
            )
          : buildTechnologies(repo),
    };
  } catch (error) {
    console.error(`  DeepSeek failed for ${repo.name}: ${error.message}`);
    return fallbackDescription(repo);
  }
}

async function main() {
  console.log('Fetching repositories with the "portfolio" topic...');
  const repos = await getRepositories();
  console.log(`Found ${repos.length} repository(ies).`);

  const projects = [];

  for (const repo of repos) {
    console.log(`Processing ${repo.name}...`);

    const filePaths = await listMarkdownFiles(repo);
    const markdown = await collectMarkdown(repo, filePaths);
    const descriptions = await generateDescriptions(repo, markdown);

    const githubUrl = repo.html_url;
    const liveUrl = repo.homepage || githubUrl;

    projects.push({
      repo: repo.name,
      title: descriptions.title,
      description: descriptions.shortDescription,
      fullDescription: descriptions.fullDescription,
      github: githubUrl,
      live: liveUrl,
      link: githubUrl,
      technologies: descriptions.technologies,
      details: false,
      projectDetailsPageSlug: githubUrl,
      updatedAt: repo.pushed_at || repo.updated_at || new Date().toISOString(),
    });
  }

  // Newest first: recently pushed repositories appear at the top.
  projects.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(projects, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${projects.length} project(s) to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
