'use client';

import { VaultCard } from '@/app/vaults/components/VaultCard';
import { PageHandler } from '@/components/PageHandler';
import { usePublicVaultsByTags } from '@/hooks/client/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';

interface VaultSearchResultsProps {
  query: string;
}

export function VaultSearchResults({ query }: VaultSearchResultsProps) {
  const { vaults, loading, hasMore, loadMore } = usePublicVaultsByTags({
    searchTerm: query,
    take: 10,
    sortBy: SortBy.VaultViewCount,
    orderBy: SortOrder.Desc
  });

  return (
    <PageHandler isLoading={loading && !vaults.length} isEmpty={!vaults.length && !loading}>
      <InfiniteScrollManager dataLength={vaults.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore} useWindowScroll>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {vaults.map((vault) => (
            <VaultCard key={vault.id} vault={vault} />
          ))}
        </div>
      </InfiniteScrollManager>
    </PageHandler>
  );
}
