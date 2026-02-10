'use client';

import { PageHandler } from '@/components/PageHandler';
import { useLikedVaults } from '@/hooks/useLikedVaults';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { useState } from 'react';
import { LikedVaultsGrid } from './LikedVaultsGrid';
import { LikedVaultsHeader } from './LikedVaultsHeader';

export function LikedVaults() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { vaultLikes, loadMore, hasMore, loading } = useLikedVaults({ take: 30 });

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-12 pt-0 max-w-7xl mx-auto w-full pb-20">
      <LikedVaultsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PageHandler isLoading={loading && !vaultLikes.length} isEmpty={!vaultLikes.length && !loading} path={APP_PATHS.LIKED_VAULTS}>
        <LikedVaultsGrid items={vaultLikes} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
      </PageHandler>
    </div>
  );
}
