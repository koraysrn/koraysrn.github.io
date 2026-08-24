/**
 * Manual per-repository overrides for the automatically generated project
 * list. The key is the GitHub repository name (e.g. "my-repo"); any field
 * provided here replaces the corresponding generated value. Fields you do
 * not set fall back to the generated value.
 *
 * Example:
 *   export const projectOverrides: Record<string, ProjectOverride> = {
 *     'my-repo': {
 *       title: 'My Fancy Project',
 *       technologies: ['TypeScript', 'Next.js'],
 *     },
 *   };
 */
export interface ProjectOverride {
  title?: string;
  description?: string;
  fullDescription?: string;
  link?: string;
  technologies?: string[];
  github?: string;
  live?: string;
  details?: boolean;
  projectDetailsPageSlug?: string;
}

export const projectOverrides: Record<string, ProjectOverride> = {};
