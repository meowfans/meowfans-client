'use client';

import { AppHeader } from '@/components/AppHeader';
import { authenticatedPaths } from '@/lib/constants';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: Props) {
  const pathname = usePathname();

  const isNotAuthenticated =
    !authenticatedPaths.includes(pathname) &&
    !pathname.startsWith('/channels') &&
    !pathname.startsWith('/posts') &&
    !pathname.startsWith('/assets');

  if (isNotAuthenticated) return <div>{children}</div>;

  return (
    <div>
      <AppHeader />
      {children}
    </div>
  );
}
