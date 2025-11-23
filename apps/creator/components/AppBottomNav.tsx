'use client';

import { appBottomNavButtonOptions, authenticatedPaths } from '@/lib/constants';
import { Button } from '@workspace/ui/components/button';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { usePathname, useRouter } from 'next/navigation';

export const AppBottomNav = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();

  if (!isMobile || !authenticatedPaths.includes(pathname)) return null;

  return (
    <div className="w-full bg-white dark:bg-black rounded-xl fixed bottom-0 h-16 z-50">
      <div className="flex flex-row justify-between items-center content-center p-1">
        {appBottomNavButtonOptions.map((button, idx) => (
          <Button
            key={idx}
            className="flex flex-col items-center content-center rounded-xl shadow-accent-foreground"
            variant={'outline'}
            onClick={() => router.push(button.path)}
          >
            <button.icon />
          </Button>
        ))}
      </div>
    </div>
  );
};
