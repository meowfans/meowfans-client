'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { appBottomNavButtonOptions, authenticatedPaths } from '@/lib/constants';
import { Button } from '@workspace/ui/components/button';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { usePathname, useRouter } from 'next/navigation';

export const AppBottomNav = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const { creator } = useCreator();
  const username = creator.user.username;
  const canShowBottomNav = (pathname.startsWith(`/${creator.user.username}`) || authenticatedPaths.includes(pathname)) && isMobile;

  const navigationItems = appBottomNavButtonOptions.map((item) => {
    if (item.path === '/profile') {
      return {
        ...item,
        path: `/${username}`,
        title: 'Profile',
        url: creator.user.avatarUrl
      };
    }
    return item;
  });

  const normalizedPath = () => {
    if (username && pathname === `/${username}`) return `/${username}`;
    if (pathname.startsWith('/channels')) return '/channels';
    if (pathname.startsWith('/studio')) return '/studio';
    return pathname;
  };

  return canShowBottomNav ? (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-2">
        {navigationItems.map((item, idx) => (
          <Button
            key={idx}
            size="icon"
            className="rounded-xl"
            variant={normalizedPath() === item.path ? 'secondary' : 'ghost'}
            onClick={() => router.push(item.path)}
          >
            {item.url ? <SAvatar url={item.url} className="w-5 h-5" /> : <item.icon />}
          </Button>
        ))}
      </div>
    </div>
  ) : null;
};
