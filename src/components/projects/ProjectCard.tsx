'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useUmami } from '@/hooks/use-umami';
import type { AnalyticsEventData } from '@/types/analytics';
import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import React, { useState } from 'react';

import ArrowRight from '../svgs/ArrowRight';
import Github from '../svgs/Github';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { trackEvent } = useUmami();
  const [expanded, setExpanded] = useState(false);

  // Stable, human-readable id derived from the project's details route, e.g.
  // '/projects/sleek-portfolio' -> 'sleek-portfolio'. Keeps every project
  // uniquely identifiable in the dashboard with no per-project config.
  const projectId =
    project.projectDetailsPageSlug.split('/').filter(Boolean).pop() ??
    project.title;

  const trackProject = (
    action: AnalyticsEventData['project_click']['action'],
  ) =>
    trackEvent({
      name: 'project_click',
      data: {
        projectId,
        projectTitle: project.title,
        action,
        location: 'project_card',
      },
    });

  return (
    <Card className="group h-full w-full overflow-hidden border-gray-100 p-0 shadow-none transition-all dark:border-gray-800">
      <CardContent className="px-6 pt-6">
        <div className="space-y-4">
          {/* Project Header - Title and Icons */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href={project.projectDetailsPageSlug}
              onClick={() => trackProject('view_details')}
            >
              <h3 className="group-hover:text-primary text-xl leading-tight font-semibold hover:cursor-pointer">
                {project.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger>
                  {project.github && (
                    <Link
                      className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-colors"
                      href={project.github}
                      target="_blank"
                      onClick={() => trackProject('visit_github')}
                    >
                      <Github />
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on GitHub</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Description */}
          <p className="text-secondary">{project.description}</p>
          {project.fullDescription && (
            <div>
              {expanded && (
                <p className="text-secondary mt-2">
                  {project.fullDescription}
                </p>
              )}
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="text-primary mt-2 text-sm font-medium underline-offset-4 hover:underline"
              >
                {expanded ? 'Read less' : 'Read more'}
              </button>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h4 className="text-secondary mb-2 text-sm font-medium">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology, index) => (
                <span
                  key={index}
                  className="rounded-md bg-black/5 px-2 py-1 text-xs font-medium text-black dark:bg-white/15 dark:text-white"
                >
                  {technology.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      {project.details && (
        <CardFooter className="flex justify-end p-6 pt-0">
          <Link
            href={project.projectDetailsPageSlug}
            className="text-secondary hover:text-primary flex items-center gap-2 text-sm underline-offset-4 transition-colors hover:underline"
            onClick={() => trackProject('view_details')}
          >
            View Details <ArrowRight className="size-4" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
