'use client';

import { AppHeader } from '@/components/AppHeader';
import { useNormalizePath } from '@/hooks/useNormalizePath';

interface Props {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: Props) {
  const { isAuthenticatedPath } = useNormalizePath();

  return (
    <div>
      {!isAuthenticatedPath ? (
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
