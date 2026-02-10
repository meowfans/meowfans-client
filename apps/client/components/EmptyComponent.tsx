'use client';

import { EMPTY_TEXTS } from '@/lib/constants/empty-texts';
import { APP_PATHS } from '@/lib/constants/feature-paths';

interface EmptyComponentProps {
  path: APP_PATHS;
}

export const EmptyComponent = ({ path }: EmptyComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">{EMPTY_TEXTS[path]}</p>
    </div>
  );
};
