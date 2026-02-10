'use client';

import { PageHandler } from '@/components/PageHandler';
import { useVaults } from '@/hooks/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { VaultCard } from './VaultCard';
import { VaultsHeader } from './VaultsHeader';

export function Vaults() {
  const { vaults, loadMore, hasMore, loading } = useVaults({
    take: 40,
    sortBy: SortBy.VaultViewCount,
    orderBy: SortOrder.Desc
  });

  return (
    <div className="flex flex-1 flex-col gap-6 p-3">
      <VaultsHeader />

      <PageHandler isEmpty={!vaults.length && !loading} isLoading={loading && !vaults.length}>
        <InfiniteScrollManager dataLength={vaults.length} loading={loading} useWindowScroll hasMore={hasMore} onLoadMore={loadMore}>
          <div className="grid grid-cols-1 gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {vaults.map((vault) => (
              <VaultCard key={vault.id} vault={vault} />
            ))}
          </div>

          {loading && (
            <div className="py-10 flex justify-center">
              <Loading />
            </div>
          )}
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
}
