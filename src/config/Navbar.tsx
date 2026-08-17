export interface NavItem {
  label: string;
  href: string;
}

export const navbarConfig = {
  navItems: [
    {
      label: 'Experience',
      href: '/work-experience',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
  ] as NavItem[],
};
