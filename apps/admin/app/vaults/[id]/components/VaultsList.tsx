'use client';

import { useVaults } from '@/hooks/useVaults';
import { SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { format } from 'date-fns';
import { Calendar, Database, Eye, Heart, Settings } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export function VaultsList() {
  const { id } = useParams<{ id: string }>();
  const { vaults, loading, hasNext, handleLoadMore } = useVaults({ take: 30, relatedUserId: id, orderBy: SortOrder.Desc });

  const router = useRouter();

  return (
    <div className="flex-1 min-h-0">
      {loading && vaults.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <InfiniteScrollManager dataLength={vaults.length} hasMore={hasNext} onLoadMore={handleLoadMore} loading={loading} useWindowScroll>
          <div className="flex flex-col gap-3">
            {vaults.map((vault) => (
              <div
                key={vault.id}
                className="group flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 p-3 border border-primary/10 bg-card hover:border-primary/30 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="relative h-24 sm:h-20 aspect-video sm:w-36 overflow-hidden rounded-lg bg-muted shrink-0 shadow-inner">
                  {vault.preview ? (
                    <Image
                      src={vault.preview}
                      alt={vault.description || 'Vault preview'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/5">
                      <Database className="h-6 w-6 text-primary/20" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                <div className="flex-1 min-w-0 space-y-1 py-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-black uppercase tracking-tight text-sm md:text-base truncate group-hover:text-primary transition-colors">
                      {vault.description || 'Unnamed Vault'}
                    </h3>
                    {vault?.unlockPrice && (
                      <Badge className="bg-primary/90 text-[9px] md:text-[10px] font-black uppercase tracking-tighter px-1.5 md:px-2 py-0 h-4 md:h-5">
                        ${vault.unlockPrice}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-primary/60 font-medium truncate max-w-xs md:max-w-md">
                    <Database className="h-2.5 w-2.5 opacity-50" />
                    <span className="truncate opacity-80 hover:opacity-100 cursor-default">{vault.url}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <div className="flex items-center gap-1 text-[9px] text-muted-foreground font-bold uppercase tracking-widest bg-muted/50 px-2 py-0.5 rounded-full">
                      <Calendar className="h-2.5 w-2.5 text-primary/40" />
                      {format(new Date(vault.createdAt), 'MMM dd, yyyy: HH:mm:ss')}
                    </div>

                    <Badge
                      variant="secondary"
                      className="bg-primary/5 text-primary text-[8px] md:text-[9px] font-bold uppercase h-4 md:h-5 border-primary/10 px-1.5"
                    >
                      {vault.objectCount || 0} Objects
                    </Badge>

                    {vault.keywords && vault.keywords.length > 0 && (
                      <div className="flex items-center gap-1 hidden xs:flex">
                        {vault.keywords.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[8px] md:text-[9px] text-muted-foreground font-medium uppercase opacity-50">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6 px-3 md:px-4 border-l border-primary/5 hidden md:flex shrink-0">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter opacity-60">Likes</span>
                    <div className="flex items-center gap-1">
                      <Heart className={`h-3 w-3 ${vault.likeCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-muted-foreground/30'}`} />
                      <span className="text-xs md:text-sm font-black tabular-nums">{vault.likeCount || 0}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter opacity-60">Status</span>
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider ${vault.isPurchased ? 'text-green-500' : 'text-amber-500'}`}
                    >
                      {vault.isPurchased ? 'Purchased' : 'Public'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1 md:bg-muted/30 rounded-lg shrink-0 self-end sm:self-center">
                  <Button
                    size="sm"
                    className="flex-1 sm:flex-none font-black uppercase tracking-tighter text-[10px] h-8 px-4 bg-primary shadow-sm hover:shadow-md transition-all active:scale-95"
                    onClick={() => router.push(`/vaults/${vault.id}/objects`)}
                  >
                    <Eye className="h-3 w-3 mr-1.5" />
                    Open
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5 text-muted-foreground hover:text-primary">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScrollManager>
      )}
    </div>
  );
}
