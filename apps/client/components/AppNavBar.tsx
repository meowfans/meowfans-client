'use client';

import { Button } from '@workspace/ui/components/button';
import { ScrollArea, ScrollBar } from '@workspace/ui/components/scroll-area';
import { cn } from '@workspace/ui/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

const categories: { path: string; label: string }[] = [
  { path: '/trending/pictures', label: 'Pictures' },
  { path: '/shorts', label: 'Shorts' },
  { path: '/trending/vaults', label: 'Albums' },
  { path: '/creators/porn', label: 'Free' },
  { path: '/trending/posts', label: 'Posts' },
  { path: '/trending/creators', label: 'Newest' },
  { path: '/following', label: 'Following' }
];

export const AppNavBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const isWatchingShorts = '/shorts' === pathName;

  return isWatchingShorts ? null : (
    <div className="flex-1 min-w-0 max-w-full overflow-hidden">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-3 snap-x">
          {categories.map(({ label, path }) => (
            <Button
              key={label}
              variant={pathName === path ? 'outline' : 'ghost'}
              onClick={() => router.push(path)}
              className={cn(
                'rounded-full text-sm px-4 md:py-1 py-0 transition-all duration-200 snap-center',
                pathName === path ? 'shadow-accent-foreground' : 'hover:bg-muted hover:text-foreground'
              )}
            >
              {label}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
