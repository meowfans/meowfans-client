'use client';

import { useVaults } from '@/hooks/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { Heart, Lock, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function VaultsView() {
  const { vaults, loadMore, hasMore, loading } = useVaults({
    take: 40,
    sortBy: SortBy.VaultViewCount,
    orderBy: SortOrder.Desc
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Scanning Vaults</p>
      </div>
    );
  }

  if (!vaults.length && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Vaults Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-3">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Vaults</h1>
        <p className="text-muted-foreground">Explore exclusive content collections from creators</p>
      </div>

      {/* Vaults Grid */}

      <InfiniteScrollManager dataLength={vaults.length} loading={loading} useWindowScroll hasMore={hasMore} onLoadMore={loadMore}>
        <div className="grid grid-cols-1 gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {vaults.map((vault) => (
            <Link key={vault.id} href={`/vaults/${vault.id}`}>
              <Card className="group overflow-hidden border-none bg-secondary/20 shadow-none transition-all hover:bg-secondary/40 hover:shadow-lg hover:shadow-primary/5">
                {/* Preview Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    width={300}
                    height={400}
                    src={vault.preview}
                    alt={vault.description || 'Vault preview'}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay badges */}
                  <div className="absolute left-2 top-2 flex flex-wrap gap-2">
                    {vault.unlockPrice && (
                      <Badge variant="secondary" className="gap-1 bg-background/80 backdrop-blur-sm">
                        <Lock className="h-3 w-3" />${vault.unlockPrice}
                      </Badge>
                    )}
                    {vault.isPurchased && (
                      <Badge variant="default" className="gap-1 bg-primary/80 backdrop-blur-sm">
                        <ShoppingCart className="h-3 w-3" />
                        Owned
                      </Badge>
                    )}
                  </div>

                  {/* Object count badge */}
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {vault.objectCount} {vault.objectCount === 1 ? 'item' : 'items'}
                    </Badge>
                  </div>
                </div>

                {/* Vault Details */}
                <CardContent className="p-4">
                  {/* Description */}
                  {vault.description && <p className="mb-2 line-clamp-2 text-sm text-foreground">{vault.description}</p>}

                  {/* Like indicator */}
                  {vault.isLiked && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                      <span>Liked</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {loading && <Loading />}
      </InfiniteScrollManager>
    </div>
  );
}
