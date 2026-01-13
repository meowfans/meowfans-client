'use client';

import { appBottomNavButtonOptions, authenticatedPaths } from '@/lib/constants';
import { Button } from '@workspace/ui/components/button';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { usePathname, useRouter } from 'next/navigation';

export const AppBottomNav = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const canShowBottomNav = !isMobile || !authenticatedPaths.includes(pathname);

  return canShowBottomNav ? null : (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-2">
        {appBottomNavButtonOptions.map((button, idx) => (
          <Button
            key={idx}
            size="icon"
            className="rounded-xl"
            variant={pathname === button.path ? 'secondary' : 'ghost'}
            onClick={() => router.push(button.path)}
          >
            <button.icon />
          </Button>
        ))}
      </div>
    </div>
  );
};
