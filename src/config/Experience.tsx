export interface Technology {
  name: string;
  href: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: false,
    company: 'Intellica',
    position: 'AI Developer — Intern',
    location: 'Ataşehir / Istanbul',
    image: '/intellica_logo.jpg',
    description: [
      'Worked on Agentic AI development, building both multi-agent and single-agent LLM chat systems.',
      'Gained hands-on familiarity with the LangGraph and CrewAI frameworks.',
      'Built knowledge of vector databases and implemented a RAG pipeline.',
      'Contributed to a portfolio intelligence assistant covering financial data analysis and user interaction.',
    ],
    startDate: 'July 2026',
    endDate: 'August 2026',
    technologies: [
      { name: 'Python', href: 'https://www.python.org/' },
      { name: 'LangGraph', href: 'https://www.langchain.com/langgraph' },
      { name: 'CrewAI', href: 'https://www.crewai.com/' },
      { name: 'RAG', href: 'https://www.langchain.com/' },
      { name: 'SQL', href: 'https://www.postgresql.org/' },
    ],
    website: 'https://intellica.net/tr/',
  },
];
