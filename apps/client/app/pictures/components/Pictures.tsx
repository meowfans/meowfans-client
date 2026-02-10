'use client';

import { BlurImage } from '@/components/BlurImage';
import { PageHandler } from '@/components/PageHandler';
import { useVaultObjects } from '@/hooks/useVaultObjects';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Expand, Heart } from 'lucide-react';
import { PicturesHeader } from './PicturesHeader';

export function Pictures() {
  const { vaultObjects, loadMore, hasMore, loading } = useVaultObjects({
    take: 30,
    sortBy: SortBy.VaultObjectLikeCount,
    orderBy: SortOrder.Desc
  });

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-3 md:p-8 pt-4 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      <PicturesHeader />
      <PageHandler isLoading={loading && !vaultObjects.length} isEmpty={!vaultObjects.length && !loading}>
        <InfiniteScrollManager dataLength={vaultObjects.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
          <div className="grid grid-cols-1 min-[450px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-1">
            <AnimatePresence mode="popLayout">
              {vaultObjects.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="group relative"
                >
                  <Card className="overflow-hidden border-none bg-secondary/20 shadow-none rounded-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-zoom-in">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <BlurImage
                        src={item.rawUrl}
                        alt="Vault capture"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute left-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                        {item.unlockPrice && !item.isPurchased && (
                          <Badge className="bg-primary hover:bg-primary text-white border-none font-black text-[10px] uppercase px-3 py-1 shadow-lg shadow-primary/20">
                            ${item.unlockPrice}
                          </Badge>
                        )}
                        {item.isPurchased && (
                          <Badge className="bg-green-500 hover:bg-green-500 text-white border-none font-black text-[10px] uppercase px-3 py-1 shadow-lg shadow-green-500/20">
                            Purchased
                          </Badge>
                        )}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/10"
                          >
                            <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/10"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/10"
                        >
                          <Expand className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {loading && (
            <div className="flex items-center justify-center p-12">
              <Loading />
            </div>
          )}
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
}
