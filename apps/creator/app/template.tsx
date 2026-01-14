'use client';

import { AppHeader } from '@/components/AppHeader';
import { useCreator } from '@/hooks/context/useCreator';
import { isAuthenticatedPath } from '@/util/helpers';
import { useBackground } from '@workspace/ui/hooks/useBackground';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: Props) {
  const pathname = usePathname();
  const { creator } = useCreator();
  const { bgColor } = useBackground();
  return (
    <div>
      {!isAuthenticatedPath(pathname) && !pathname.startsWith(`/${creator.user.username}`) ? (
        <div>{children}</div>
      ) : (
        <div className={bgColor}>
          <AppHeader />
          {children}
        </div>
      )}
    </div>
  );
}
