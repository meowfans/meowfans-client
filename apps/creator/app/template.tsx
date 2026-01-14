'use client';

import { AppHeader } from '@/components/AppHeader';
import { useCreator } from '@/hooks/context/useCreator';
import { isAuthenticatedPath } from '@/util/helpers';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: Props) {
  const pathname = usePathname();
  const { creator } = useCreator();

  return (
    <div>
      {!isAuthenticatedPath(pathname) && !pathname.startsWith(`/${creator.user.username}`) ? (
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
