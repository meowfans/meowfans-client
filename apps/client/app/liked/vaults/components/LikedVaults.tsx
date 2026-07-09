'use client';

import { PageHandler } from '@/components/PageHandler';
import { useServerLikedVaults } from '@/hooks/server/useServerLikedVaults';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { GetLikedVaultsOutput } from '@workspace/gql/generated/graphql';
import { useState } from 'react';
import { LikedVaultsGrid } from './LikedVaultsGrid';
import { LikedVaultsHeader } from './LikedVaultsHeader';

interface LikedVaultsProps {
  initialVaultLikes: GetLikedVaultsOutput[];
}

export function LikedVaults({ initialVaultLikes }: LikedVaultsProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { vaultLikes, loadMore, hasMore, loading } = useServerLikedVaults({ take: 30 }, initialVaultLikes);

  return (
    <div className="flex flex-1 flex-col gap-3 p-2 bg-background/50 backdrop-blur-3xl h-screen">
      <LikedVaultsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PageHandler isLoading={loading && !initialVaultLikes.length} isEmpty={!vaultLikes.length} path={APP_PATHS.LIKED_VAULTS}>
        <LikedVaultsGrid items={vaultLikes} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
      </PageHandler>
    </div>
  );
}
