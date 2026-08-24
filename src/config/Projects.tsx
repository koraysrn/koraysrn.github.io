import generatedProjects from '@/data/projects/generated.json';
import { Project } from '@/types/project';

import { projectOverrides } from './projectOverrides';

interface GeneratedProject {
  repo: string;
  title: string;
  description: string;
  fullDescription?: string;
  github: string;
  live: string;
  link: string;
  technologies: string[];
  details: boolean;
  projectDetailsPageSlug: string;
  updatedAt: string;
}

const sortedGenerated = [...(generatedProjects as GeneratedProject[])].sort(
  (a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
);

export const projects: Project[] = sortedGenerated.map((generated) => {
  const override = projectOverrides[generated.repo] ?? {};

  return {
    title: override.title ?? generated.title,
    description: override.description ?? generated.description,
    fullDescription: override.fullDescription ?? generated.fullDescription,
    link: override.link ?? generated.link,
    technologies: (override.technologies ?? generated.technologies).map(
      (name) => ({ name }),
    ),
    github: override.github ?? generated.github,
    live: override.live ?? generated.live,
    details: override.details ?? generated.details,
    projectDetailsPageSlug:
      override.projectDetailsPageSlug ?? generated.projectDetailsPageSlug,
  };
});
