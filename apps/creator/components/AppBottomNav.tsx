'use client';

import { Button } from '@workspace/ui/components/button';
import { PathNormalizer } from '@workspace/ui/hooks/PathNormalizer';
import { BarChart, Home, Lock, MessageCircle, Palette } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', url: '/dashboard', icon: Home },
  { label: 'Posts', url: '/posts-studio', icon: Palette },
  { label: 'Vaults', url: '/vaults-studio', icon: Lock },
  { label: 'Messages', url: '/channels', icon: MessageCircle },
  { label: 'Analytics', url: '/analytics', icon: BarChart }
];

export function AppBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  
  if (pathname.startsWith('/channels/')) return null;
  if (pathname.startsWith('/playground')) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid h-16 max-w-3xl grid-cols-5 items-center justify-items-center px-2">
        {navItems.map((item, idx) => {
          const isActive = PathNormalizer.resolve({ pathname }) === item.url;
          return (
            <Button
              key={idx}
              variant={isActive ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-xl h-11 w-11 shrink-0 relative"
              onClick={() => router.push(item.url)}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
