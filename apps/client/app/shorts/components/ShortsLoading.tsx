'use client';

import { Loading } from '@workspace/ui/globals/Loading';

interface ShortsLoadingProps {
  fullScreen?: boolean;
}

export function ShortsLoading({ fullScreen = false }: ShortsLoadingProps) {
  if (fullScreen) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] gap-4">
        <Loading />
        <p className="text-xs uppercase tracking-[0.3em] animate-pulse">Syncing Reels</p>
      </div>
    );
  }

  return (
    <div className="h-20 flex items-center justify-center">
      <Loading />
    </div>
  );
}
