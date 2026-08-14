import Github from '@/components/svgs/Github';
import Mail from '@/components/svgs/Mail';

export const heroConfig = {
  // Personal Information
  name: 'Koray Sirin',
  title: 'AI Developer',
  avatar: '/photo_6050694930008576177_y.jpg',

  // Skills Configuration
  skills: [] as { name: string; href: string; component: string }[],

  // Description Configuration
  description: {
    template:
      'I develop multi-agent systems with Python, LangGraph and CrewAI. I create solutions in artificial intelligence and machine learning, and design LLM-based intelligent assistants.',
  },

  // Buttons Configuration
  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in Touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/koraysrn',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:sirinkoray4@gmail.com',
    icon: <Mail />,
  },
];
