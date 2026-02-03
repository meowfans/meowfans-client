'use client';

import { appBottomNavButtonOptions } from '@/lib/constants';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AppBottomNav = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  // Define V2 specific mobile visibility logic if needed, currently reusing logic pattern but purely for V2 routes
  // Assuming V2 Bottom Nav should always be visible on mobile for V2 pages
  if (!isMobile) return null;

  // Don't show bottom nav on individual chat pages
  if (pathname.includes('/channels/')) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border pb-safe">
      <div className="flex flex-row items-center px-4 py-3 overflow-x-auto no-scrollbar gap-2 justify-between">
        {appBottomNavButtonOptions.map((button, idx) => {
          const isActive = pathname === button.path;
          return (
            <Link
              href={button.path}
              key={idx}
              className="relative flex flex-col items-center justify-center min-w-[64px] flex-shrink-0 group"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabV2"
                  className="absolute -top-3 h-1 w-8 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              <div
                className={cn(
                  'p-1.5 rounded-xl transition-all duration-200 ease-in-out',
                  isActive ? 'text-indigo-400 bg-indigo-500/10' : 'text-muted-foreground group-hover:text-foreground'
                )}
              >
                <button.icon className={cn('h-5 w-5 md:h-6 md:w-6', isActive && 'fill-current')} />
              </div>

              <span
                className={cn(
                  'text-[9px] sm:text-[10px] mt-1 font-medium transition-colors whitespace-nowrap',
                  isActive ? 'text-indigo-400' : 'text-muted-foreground group-hover:text-foreground'
                )}
              >
                {button.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
