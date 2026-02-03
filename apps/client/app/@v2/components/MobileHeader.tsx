'use client';

import { SidebarTrigger } from '@workspace/ui/components/sidebar';
import { usePathname } from 'next/navigation';

export const MobileHeader = () => {
  const pathname = usePathname();

  // Extract the last segment of the path and format it to Title Case
  const title =
    pathname
      .split('/')
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()) || 'MeowFans';

  if (pathname.includes('/channels/')) return null;

  return (
    <div className="sticky top-0 z-40 flex h-14 w-full items-center gap-4 border-b border-border bg-background/80 backdrop-blur-md px-4 md:hidden">
      <SidebarTrigger />
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
    </div>
  );
};
