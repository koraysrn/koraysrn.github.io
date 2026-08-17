import { about } from './About';
import { heroConfig } from './Hero';

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

// Base site configuration
export const siteConfig = {
  name: heroConfig.name,
  title: 'Koray Sirin — AI Developer',
  description:
    'Koray Sirin — Portfolio of an AI Engineer working on artificial intelligence, machine learning and multi-agent systems.',
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  ogImage: '/photo.jpeg',
  author: {
    name: about.name,
    github: 'koraysrn',
    email: 'sirinkoray4@gmail.com',
  },
  keywords: [
    'AI Engineer',
    'artificial intelligence',
    'machine learning',
    'multi-agent systems',
    'LLM',
    'Python',
    'LangGraph',
    'CrewAI',
    heroConfig.name,
  ],
};

export const pageMetadata: Record<string, PageMeta> = {
  // Home page
  '/': {
    title: `${heroConfig.name} — ${heroConfig.title}`,
    description: `${about.description} Learn about my projects, experiences and technical expertise.`,
    keywords: [
      'AI Engineer',
      'artificial intelligence',
      'machine learning',
      'multi-agent',
      'Python',
      'portfolio',
    ],
    ogImage: '/photo.jpeg',
    twitterCard: 'summary_large_image',
  },

  // Contact page
  '/contact': {
    title: 'Contact — Koray Sirin',
    description:
      'Get in touch with me for collaborations, projects or opportunities.',
    keywords: ['contact', 'AI Engineer', 'email', 'GitHub'],
    ogImage: '/photo.jpeg',
    twitterCard: 'summary',
  },

  // Work Experience page
  '/work-experience': {
    title: 'Work Experience — Koray Sirin',
    description:
      'Explore my professional work experience in software and artificial intelligence.',
    keywords: ['work experience', 'career', 'AI', 'internship', 'Intellica'],
    ogImage: '/photo.jpeg',
    twitterCard: 'summary_large_image',
  },

  // Projects page
  '/projects': {
    title: 'Projects — Koray Sirin',
    description:
      'Explore my projects and work in artificial intelligence and software.',
    keywords: ['projects', 'AI', 'software', 'machine learning'],
    ogImage: '/photo.jpeg',
    twitterCard: 'summary_large_image',
  },

  // Blog page
  '/blog': {
    title: 'Blog — Koray Sirin',
    description:
      'My thoughts and writings on artificial intelligence, software and technology.',
    keywords: ['blog', 'artificial intelligence', 'software', 'technology'],
    ogImage: '/photo.jpeg',
    twitterCard: 'summary_large_image',
  },

  // Resume page
  '/resume': {
    title: 'Resume — Koray Sirin',
    description: `View and download Koray Sirin's resume.`,
    keywords: ['resume', 'cv', 'AI Engineer', 'skills'],
    ogImage: '/photo.jpeg',
    twitterCard: 'summary',
  },

  // Gears page
  '/gears': {
    title: 'Gear — Koray Sirin',
    description:
      'The tools and software I use to get my work done efficiently.',
    keywords: ['gear', 'tools', 'software', 'development environment'],
    ogImage: '/photo.jpeg',
    twitterCard: 'summary_large_image',
  },
};

// Helper function to get metadata for a specific page
export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] || pageMetadata['/'];
}

// Helper function to generate complete metadata object for Next.js
export function generateMetadata(pathname: string) {
  const pageMeta = getPageMetadata(pathname);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords?.join(', '),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}${pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname}`,
    },
  };
}
