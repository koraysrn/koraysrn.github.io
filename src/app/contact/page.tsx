import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { contactConfig } from '@/config/Contact';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Github, Mail, MapPin, Phone } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/contact'),
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
};

const contactItems = [
  {
    label: 'Email',
    value: contactConfig.email,
    href: `mailto:${contactConfig.email}`,
    icon: <Mail className="size-5" />,
  },
  {
    label: 'GitHub',
    value: 'github.com/koraysrn',
    href: contactConfig.github,
    icon: <Github className="size-5" />,
  },
  {
    label: 'Phone',
    value: contactConfig.phone,
    href: `tel:${contactConfig.phone.replace(/\s/g, '')}`,
    icon: <Phone className="size-5" />,
  },
  {
    label: 'Location',
    value: contactConfig.location,
    icon: <MapPin className="size-5" />,
  },
];

export default function ContactPage() {
  return (
    <Container className="py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {contactConfig.title}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {contactConfig.description}
          </p>
        </div>
        <Separator />

        {/* Contact Info */}
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-lg border border-dashed border-black/20 px-4 py-3 dark:border-white/10"
            >
              <div className="bg-muted flex size-10 items-center justify-center rounded-md">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-secondary hover:text-primary text-base font-semibold"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-secondary text-base font-semibold">
                    {item.value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
