'use client';

import { ApplyAd } from '@/components/ApplyAd';
import { PageHandler } from '@/components/PageHandler';
import { useServerVaults } from '@/hooks/server/useServerVaults';
import { GetPublicVaultsOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { VaultCard } from './VaultCard';
import { VaultsHeader } from './VaultsHeader';

interface VaultsProps {
  initialVaults: GetPublicVaultsOutput[];
}

export function Vaults({ initialVaults }: VaultsProps) {
  const { vaults, loadMore, hasMore, loading } = useServerVaults(
    {
      take: 30,
      sortBy: SortBy.VaultViewCount,
      orderBy: SortOrder.Desc
    },
    initialVaults
  );

  return (
    <div className="flex flex-1 flex-col gap-6 p-3">
      <VaultsHeader />
      <PageHandler isEmpty={!vaults.length} isLoading={loading && !initialVaults?.length}>
        <InfiniteScrollManager dataLength={vaults.length} loading={loading} useWindowScroll hasMore={hasMore} onLoadMore={loadMore}>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {vaults.map((vault, idx) => (
              <ApplyAd
                element={<VaultCard key={vault.id} vault={vault} />}
                canApplyAd={idx > 0 && idx % 25 === 0}
                zoneIndex={idx}
                key={vault.id}
              />
            ))}
          </div>
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
}
