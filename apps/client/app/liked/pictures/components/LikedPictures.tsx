'use client';

import { PageHandler } from '@/components/PageHandler';
import { useLikedVaultObjects } from '@/hooks/useLikedVaultObjects';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { useState } from 'react';
import { LikedPicturesGrid } from './LikedPicturesGrid';
import { LikedPicturesHeader } from './LikedPicturesHeader';

export function LikedPictures() {
  const { vaultObjectLikes, loadMore, hasMore, loading } = useLikedVaultObjects({ take: 30 });
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-4 md:p-8 pt-4 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      <LikedPicturesHeader count={vaultObjectLikes.length} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PageHandler
        isLoading={loading && !vaultObjectLikes.length}
        isEmpty={!vaultObjectLikes.length && !loading}
        path={APP_PATHS.LIKED_PICTURES}
      >
        <LikedPicturesGrid items={vaultObjectLikes} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
      </PageHandler>
    </div>
  );
}
