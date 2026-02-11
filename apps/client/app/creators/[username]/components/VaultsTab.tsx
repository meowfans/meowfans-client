'use client';

import { BlurImage } from '@/components/BlurImage';
import { PageHandler } from '@/components/PageHandler';
import { useServerVaults } from '@/hooks/server/useServerVaults';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import Link from 'next/link';

interface VaultsTabProps {
  username: string;
}

export function VaultsTab({ username }: VaultsTabProps) {
  const { vaults, loadMore, hasMore, loading } = useServerVaults(
    {
      username,
      take: 30,
      sortBy: SortBy.VaultCreatedAt,
      orderBy: SortOrder.Desc
    },
    []
  );

  return (
    <PageHandler isLoading={loading} isEmpty={vaults.length === 0} path={APP_PATHS.VAULTS}>
      <InfiniteScrollManager dataLength={vaults.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore} useWindowScroll>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {vaults.map((vault) => (
            <Link key={vault.id} href={`/vaults/${vault.id}`} className="overflow-hidden rounded-lg border bg-card">
              <div className="aspect-square overflow-hidden bg-muted">
                <BlurImage src={vault.preview} alt="Vault preview" className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                {vault.description && <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{vault.description}</p>}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{vault.objectCount} items</span>
                  {vault.unlockPrice && <span className="font-medium">${vault.unlockPrice}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {loading && <Loading />}
      </InfiniteScrollManager>
    </PageHandler>
  );
}
