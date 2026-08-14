import { navbarConfig } from '@/config/Navbar';
import Image from 'next/image';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';
import { TrackedLink } from './TrackedLink';

export default function Navbar() {
  return (
    <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-baseline gap-4">
          <TrackedLink
            href="/"
            track={{
              name: 'button_click',
              data: { buttonId: 'logo', section: 'navbar' },
            }}
          >
            <div className="relative h-12 w-12">
              <Image
                className="h-12 w-12 rounded-md border border-gray-200 bg-blue-300 transition-all duration-300 ease-in-out hover:scale-90 dark:bg-yellow-300"
                src={navbarConfig.logo.src}
                alt={navbarConfig.logo.alt}
                width={navbarConfig.logo.width}
                height={navbarConfig.logo.height}
              />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <span className="block h-0.5 w-7 rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-cyan-400" />
                <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-cyan-400 bg-clip-text text-[11px] font-black uppercase leading-none text-transparent">
                  Home
                </span>
                <span className="block h-0.5 w-7 rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-cyan-400" />
              </div>
            </div>
          </TrackedLink>
          <div className="flex items-center justify-center gap-4">
            {navbarConfig.navItems.map((item) => (
              <TrackedLink
                className="transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
                key={item.label}
                href={item.href}
                track={{
                  name: 'button_click',
                  data: { buttonId: item.label, section: 'navbar' },
                }}
              >
                {item.label}
              </TrackedLink>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggleButton variant="circle" start="top-right" blur />
        </div>
      </div>
    </Container>
  );
}
