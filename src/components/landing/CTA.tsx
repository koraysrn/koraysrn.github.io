'use client';

import { ctaConfig } from '@/config/CTA';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { useUmami } from '@/hooks/use-umami';

import Container from '../common/Container';

export default function CTA() {
  const { triggerHaptic, isMobile } = useHapticFeedback();
  const { trackEvent } = useUmami();

  const handleClick = () => {
    if (isMobile()) {
      triggerHaptic('medium');
    }
    trackEvent({
      name: 'button_click',
      data: { buttonId: 'send_email', section: 'cta' },
    });
  };

  return (
    <Container className="mt-20 rounded-md border border-dashed border-black/20 py-8 dark:border-white/10">
      <div className="mt-6 w-full flex-col px-6 pb-8 sm:flex sm:items-center sm:justify-between sm:px-12">
        <p className="mb-4 text-center text-base opacity-50 sm:mb-3 md:text-xl">
          {ctaConfig.preText}
        </p>
        <div className="mt-4 flex w-full justify-center sm:mt-0 sm:w-auto sm:justify-end">
          <a
            href={`mailto:${ctaConfig.email}`}
            onClick={handleClick}
            className="group inline-flex cursor-pointer items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black shadow-[0_0_5px_rgba(0,0,0,0.1)] transition-all dark:border-white/30 dark:bg-white/15 dark:text-white dark:shadow-[0_0_5px_rgba(255,255,255,0.1)]"
          >
            <div className="relative z-20 flex items-center gap-2 transition-all duration-300 group-hover:gap-8">
              <span className="relative ml-0 block text-sm font-bold whitespace-nowrap transition-all duration-300 group-hover:ml-4">
                {ctaConfig.linkText}
              </span>
            </div>
          </a>
        </div>
      </div>
    </Container>
  );
}
