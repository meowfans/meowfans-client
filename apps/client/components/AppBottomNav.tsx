'use client';

import { Button } from '@workspace/ui/components/button';
import { PathNormalizer } from '@workspace/ui/hooks/PathNormalizer';
import { BadgeCheck, GalleryHorizontal, GalleryVerticalEnd, Home, Mails, Video } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { label: 'Home', url: '/dashboard', icon: Home },
  { label: 'Posts', url: '/posts', icon: GalleryHorizontal },
  { label: 'Shorts', url: '/shorts', icon: Video },
  { label: 'Vaults', url: '/vaults', icon: GalleryVerticalEnd },
  { label: 'Messages', url: '/channels', icon: Mails, badge: '3' },
  { label: 'Creators', url: '/creators', icon: BadgeCheck }
];

export function AppBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.startsWith('/channels/')) return null;
  if (pathname.startsWith('/shorts')) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid h-16 max-w-3xl grid-cols-6 items-center justify-items-center px-1">
        {navItems.map((item, idx) => (
          <Button
            key={idx}
            variant={PathNormalizer.resolve({ pathname }) === item.url ? 'secondary' : 'ghost'}
            size="icon"
            className="rounded-xl h-10 w-10 shrink-0"
            onClick={() => router.push(item.url)}
          >
            <item.icon className="h-5 w-5" />
          </Button>
        ))}
      </div>
    </div>
  );
}
