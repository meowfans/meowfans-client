'use client';

import { AppHeader } from '@/components/AppHeader';
import { Impersonate } from '@/components/Impersonate';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { useNormalizePath } from '@/hooks/useNormalizePath';

interface RootTemplateProps {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: RootTemplateProps) {
  const { isAuthenticatedPath } = useNormalizePath();
  const { switchContext } = useUtilsStore();

  return (
    <div>
      {!isAuthenticatedPath ? (
        <div>{children}</div>
      ) : (
        <div>
          <AppHeader />
          {children}
          <Impersonate creator={switchContext} />
        </div>
      )}
    </div>
  );
}
