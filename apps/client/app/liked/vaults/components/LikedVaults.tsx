'use client';

import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
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
    <div className="flex flex-1 flex-col gap-8 p-2 md:p-12 pt-0 max-w-7xl mx-auto w-full pb-20">
      <LikedVaultsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="w-full flex flex-col items-center justify-center my-4 gap-4">
        <div className="hidden md:block">
          <ExoAdProvider zoneId="5772070" zoneType={ExoAdZoneTypes.DesktopBanner} />
        </div>
        <div className="block md:hidden">
          <ExoAdProvider zoneId="5771438" zoneType={ExoAdZoneTypes.MobileBanner} />
        </div>
        <div className="w-full min-h-64 flex justify-center items-center overflow-hidden bg-white/5 rounded-xl border border-white/10 max-w-2xl">
          <ExoAdProvider zoneId="5771264" zoneType={ExoAdZoneTypes.OutStream} />
        </div>
      </div>
      <PageHandler isLoading={loading && !initialVaultLikes.length} isEmpty={!vaultLikes.length} path={APP_PATHS.LIKED_VAULTS}>
        <LikedVaultsGrid items={vaultLikes} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
      </PageHandler>
    </div>
  );
}
