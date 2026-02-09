'use client';

import { BlurImage } from '@/components/BlurImage';
import { useVaultObjects } from '@/hooks/useVaultObjects';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, Download, Expand, Heart, Image as ImageIcon, Zap } from 'lucide-react';

export function TrendingPicturesView() {
  const { vaultObjects, loadMore, hasMore, loading, isEmpty } = useVaultObjects({
    take: 30,
    sortBy: SortBy.VaultObjectLikeCount,
    orderBy: SortOrder.Desc
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Scanning Lenses</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Trending Pictures Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8 p-3 md:p-8 pt-4 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-10 w-10 md:h-14 md:w-14 rounded-[0.75rem] md:rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center border border-blue-500/20 rotate-3 flex-shrink-0">
            <Camera className="h-5 w-5 md:h-7 md:w-7 text-blue-500" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent truncate">
              Trending Gallery
            </h1>
            <p className="text-muted-foreground text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] mt-0.5 md:mt-1 flex items-center gap-2">
              <Zap className="h-3 w-3 text-primary fill-primary flex-shrink-0" />
              <span className="truncate">Most loved captures this week</span>
            </p>
          </div>
        </div>
      </div>

      <InfiniteScrollManager dataLength={vaultObjects.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
        <div className="columns-1 min-[450px]:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6 px-1">
          <AnimatePresence mode="popLayout">
            {vaultObjects.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
                className="break-inside-avoid"
              >
                <Card className="group relative overflow-hidden border-none bg-secondary/20 shadow-none rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-zoom-in">
                  <div className="relative">
                    <BlurImage
                      src={item.rawUrl}
                      alt="Trending capture"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
                    />

                    {/* Hover UI Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      {/* Top Badges */}
                      <div className="absolute left-4 top-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary hover:bg-primary text-white border-none font-black text-[9px] uppercase tracking-tighter px-2.5 h-6 rounded-lg">
                            VIRAL #{index + 1}
                          </Badge>
                          {item.unlockPrice && !item.isPurchased && (
                            <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-[9px] uppercase px-2.5 h-6 rounded-lg">
                              ${item.unlockPrice}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Bottom Info Area */}
                      <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-white">
                              <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                              <span className="text-[10px] font-black uppercase tracking-widest">{1250 + ((index * 17) % 500)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-white/60">
                              <ImageIcon className="h-4 w-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">HQ</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white"
                            >
                              <Expand className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40 italic">
                            Global Discovery Feed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-20">
            <Loading />
          </div>
        )}
      </InfiniteScrollManager>
    </div>
  );
}
