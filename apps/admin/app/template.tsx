'use client';

import { AppHeader } from '@/components/AppHeader';
import { useNormalizePath } from '@/hooks/useNormalizePath';

interface RootTemplateProps {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: RootTemplateProps) {
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
