'use client';

import { PageHandler } from '@/components/PageHandler';
import { useServerLikedVaultObjects } from '@/hooks/server/useServerLikedVaultObjects';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { GetLikedVaultObjectsOutput } from '@workspace/gql/generated/graphql';
import { useState } from 'react';
import { LikedPicturesGrid } from './LikedPicturesGrid';
import { LikedPicturesHeader } from './LikedPicturesHeader';

interface LikedPicturesProps {
  initialVaultObjectLikes: GetLikedVaultObjectsOutput[];
}

export function LikedPictures({ initialVaultObjectLikes }: LikedPicturesProps) {
  const { vaultObjectLikes, loadMore, hasMore, loading } = useServerLikedVaultObjects({ take: 30 }, initialVaultObjectLikes);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-4 md:p-8 pt-4 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      <LikedPicturesHeader count={vaultObjectLikes.length} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PageHandler isLoading={loading && !initialVaultObjectLikes.length} isEmpty={!vaultObjectLikes.length} path={APP_PATHS.LIKED_PICTURES}>
        <LikedPicturesGrid items={vaultObjectLikes} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
      </PageHandler>
    </div>
  );
}
