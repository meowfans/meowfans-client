'use client';

import { AppHeader } from '@/components/AppHeader';
import { useNormalizePath } from '@/hooks/useNormalizePath';
import { useBackground } from '@workspace/ui/hooks/useBackground';

interface Props {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: Props) {
  const { bgColor } = useBackground();
  const { isAuthenticatedPath } = useNormalizePath();

  return (
    <div>
      {!isAuthenticatedPath ? (
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
