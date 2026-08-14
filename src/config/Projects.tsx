import { Project } from '@/types/project';
import React from 'react';

const TechIcon = ({ label }: { label: string }) => (
  <span className="flex size-6 items-center justify-center rounded-md bg-black/5 text-[10px] font-semibold text-black dark:bg-white/15 dark:text-white">
    {label}
  </span>
);

export const projects: Project[] = [
  {
    title: 'Portfolio Intelligence Assistant',
    description:
      'A single-agent LLM chat system where users upload their portfolio and ask questions about it. Built with LangGraph, it uses a RAG architecture that stores portfolio documents in a ChromaDB vector database and fetches live stock data through an MCP-protocol stock market API integration.',
    image: '/photo2.jpg',
    link: 'https://github.com/koraysrn/portfolio_intelligence_assistant',
    technologies: [
      { name: 'Python', icon: <TechIcon label="Py" /> },
      { name: 'LangGraph', icon: <TechIcon label="LG" /> },
      { name: 'ChromaDB', icon: <TechIcon label="CD" /> },
      { name: 'RAG', icon: <TechIcon label="RG" /> },
      { name: 'MCP', icon: <TechIcon label="MC" /> },
      { name: 'LLM', icon: <TechIcon label="LM" /> },
    ],
    github: 'https://github.com/koraysrn/portfolio_intelligence_assistant',
    live: 'https://github.com/koraysrn/portfolio_intelligence_assistant',
    details: false,
    projectDetailsPageSlug:
      'https://github.com/koraysrn/portfolio_intelligence_assistant',
    isWorking: false,
  },
  {
    title: 'Customer Segmentation Project',
    description:
      'A data analytics project that segments customers using demographic data, web/app usage and purchase history. It follows data exploration and preprocessing, feature engineering, imbalanced data handling, modeling and evaluation, reaching 97.38% overall accuracy with an optimized XGBoost model.',
    image: '/photo2.jpg',
    link: 'https://github.com/koraysrn/Customer_Segmentation_Project',
    technologies: [
      { name: 'Python', icon: <TechIcon label="Py" /> },
      { name: 'Pandas', icon: <TechIcon label="Pd" /> },
      { name: 'NumPy', icon: <TechIcon label="Np" /> },
      { name: 'Scikit-learn', icon: <TechIcon label="Sk" /> },
      { name: 'XGBoost', icon: <TechIcon label="XG" /> },
    ],
    github: 'https://github.com/koraysrn/Customer_Segmentation_Project',
    live: 'https://github.com/koraysrn/Customer_Segmentation_Project',
    details: false,
    projectDetailsPageSlug:
      'https://github.com/koraysrn/Customer_Segmentation_Project',
    isWorking: false,
  },
  {
    title: 'Multi-Agent Portfolio Intelligence Assistant',
    description:
      'The multi-agent version of the portfolio intelligence assistant with an advanced UI/UX, charts and financial metrics. It coordinates Controller, Planning, Execution, Auto Intelligence Summary, Reflection, Critic, Decision, Confidence, Missing Information and Dynamic Tool Router agents to turn engine outputs, news, fundamentals, technical analysis and RAG into a single investment strategy.',
    image: '/photo2.jpg',
    link: 'https://github.com/koraysrn/multiagent-portfolio-intelligence-assistant',
    technologies: [
      { name: 'Python', icon: <TechIcon label="Py" /> },
      { name: 'LangGraph', icon: <TechIcon label="LG" /> },
      { name: 'CrewAI', icon: <TechIcon label="CA" /> },
      { name: 'RAG', icon: <TechIcon label="RG" /> },
      { name: 'Multi-Agent', icon: <TechIcon label="MA" /> },
      { name: 'LLM', icon: <TechIcon label="LM" /> },
    ],
    github: 'https://github.com/koraysrn/multiagent-portfolio-intelligence-assistant',
    live: 'https://github.com/koraysrn/multiagent-portfolio-intelligence-assistant',
    details: false,
    projectDetailsPageSlug:
      'https://github.com/koraysrn/multiagent-portfolio-intelligence-assistant',
    isWorking: false,
  },
];
