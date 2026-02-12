'use client';

import { BlurImage } from '@/components/BlurImage';
import { PageHandler } from '@/components/PageHandler';
import { useServerPublicCreatorVaults } from '@/hooks/server/useServerPublicCreatorVaults';
import { GetPublicVaultsOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Heart, Lock } from 'lucide-react';
import Link from 'next/link';

interface VaultsViewProps {
  userId: string;
  initialVaults: GetPublicVaultsOutput[];
}

export function VaultsView({ userId, initialVaults }: VaultsViewProps) {
  const { vaults, loading, hasMore, loadMore } = useServerPublicCreatorVaults(
    { relatedUserId: userId, take: 30, sortBy: SortBy.VaultCreatedAt, orderBy: SortOrder.Desc },
    initialVaults
  );

  return (
    <div className="flex flex-1 flex-col">
      <PageHandler isEmpty={!vaults.length} isLoading={loading && !initialVaults?.length}>
        <InfiniteScrollManager dataLength={vaults.length} loading={loading} useWindowScroll hasMore={hasMore} onLoadMore={loadMore}>
          <div className="grid grid-cols-3 gap-[1px] md:gap-1">
            {vaults.map((vault) => (
              <Link href={`/vaults/${vault.id}`} key={vault.id} className="relative aspect-square w-full overflow-hidden bg-muted/20">
                <BlurImage
                  src={vault.preview as string}
                  alt={vault.description || ''}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />

                {/* Desktop Badges (Hidden on mobile) */}
                <div className="hidden md:flex absolute left-2 top-2 flex-wrap gap-1 pointer-events-none">
                  {vault.unlockPrice && vault.unlockPrice > 0 && !vault.isPurchased && (
                    <Badge className="bg-black/60 backdrop-blur-md border-none text-white h-6 px-2 rounded-sm font-bold text-[10px]">
                      <Lock className="h-3 w-3 text-primary mr-1" />${vault.unlockPrice}
                    </Badge>
                  )}
                </div>

                {/* Mobile Lock Icon (Minimal) */}
                {vault.unlockPrice && vault.unlockPrice > 0 && !vault.isPurchased && (
                  <div className="md:hidden absolute top-2 left-2 pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-sm p-1 rounded-sm">
                      <Lock className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                )}

                {/* Media Type Icon (Tucked in corner like IG) */}
                {vault.objectCount > 1 && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-sm p-1 rounded-sm">
                      <svg className="h-3 w-3 md:h-4 md:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 19V7a2 2 0 012-2h10a2 2 0 012 2v12l-5-3-5 3z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover States */}
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1 text-white font-bold text-xs md:text-sm">
                    <Heart className="h-4 w-4 fill-white" />
                    <span>Open</span>
                  </div>
                </div>
              </Link>
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
