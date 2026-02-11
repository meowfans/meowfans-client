'use client';

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
          <div className="grid grid-cols-1 gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {vaults.map((vault) => (
              <VaultCard key={vault.id} vault={vault} />
            ))}
          </div>

          {!hasMore && vaults.length > 0 && (
            <p className="text-center text-muted-foreground py-10 font-black uppercase tracking-widest text-xs">
              You&apos;ve reached the end of the collection
            </p>
          )}
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
}
