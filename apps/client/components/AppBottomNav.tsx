'use client';

import { appBottomNavButtonOptions } from '@/lib/constants';
import { Button } from '@workspace/ui/components/button';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AppBottomNav = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  if (!isMobile || pathname === '/shorts') return null;

  return (
    <div className="w-full bg-white dark:bg-black fixed bottom-0 h-16 z-50">
      <div className="flex flex-row justify-between items-center content-center p-1">
        {appBottomNavButtonOptions.map((button, idx) => (
          <Link href={button.path} key={idx} className="flex flex-row justify-between">
            <div className="flex flex-col justify-center content-center items-center">
              <Button
                size={'icon'}
                className="flex flex-col items-center content-center rounded-xl shadow-accent-foreground"
                variant={'outline'}
              >
                <button.icon />
              </Button>
              <span className="text-xs">{button.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
