'use client';

import { AppHeader } from '@/components/AppHeader';
import { getAuthenticatedPath } from '@/util/helpers';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: Props) {
  const pathname = usePathname();

  return (
    <div>
      {getAuthenticatedPath(pathname) ? (
        <div>{children}</div>
      ) : (
        <div>
          <AppHeader />
          {children}
        </div>
      )}
    </div>
  );
}
