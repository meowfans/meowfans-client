'use client';

import { VaultCard } from '@/app/vaults/components/VaultCard';
import { PageHandler } from '@/components/PageHandler';
import { useServerPublicVaultsByTags } from '@/hooks/server/useServerPublicVaultsByTags';
import { GetPublicVaultsOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { CategoryHeader } from './CategoryHeader';

interface CategoryVaultsProps {
  label: string;
  initialVaults: GetPublicVaultsOutput[];
}

export function CategoryVaults({ label, initialVaults }: CategoryVaultsProps) {
  const { vaults, loadMore, hasMore, loading } = useServerPublicVaultsByTags(
    {
      searchTerm: label,
      take: 30,
      sortBy: SortBy.VaultViewCount,
      orderBy: SortOrder.Desc
    },
    initialVaults
  );

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
      <CategoryHeader label={label} />
      <PageHandler isEmpty={!vaults.length} isLoading={loading && !initialVaults?.length}>
        <InfiniteScrollManager dataLength={vaults.length} loading={loading} useWindowScroll hasMore={hasMore} onLoadMore={loadMore}>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
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
