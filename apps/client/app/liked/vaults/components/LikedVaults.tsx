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
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-12 pt-0 max-w-7xl mx-auto w-full pb-20">
      <LikedVaultsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PageHandler isLoading={loading && !initialVaultLikes.length} isEmpty={!vaultLikes.length} path={APP_PATHS.LIKED_VAULTS}>
        <LikedVaultsGrid items={vaultLikes} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
      </PageHandler>
    </div>
  );
}
