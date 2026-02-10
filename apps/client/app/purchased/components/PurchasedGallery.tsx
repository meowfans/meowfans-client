'use client';

import { PageHandler } from '@/components/PageHandler';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { GetFanAssetsOutput } from '@workspace/gql/generated/graphql';
import { Card, CardContent } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface PurchasedGalleryProps {
  fanAssets: GetFanAssetsOutput[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const PurchasedGallery = ({ fanAssets, loading, hasMore, onLoadMore }: PurchasedGalleryProps) => {
  return (
    <PageHandler isLoading={loading && !fanAssets.length} isEmpty={!fanAssets.length && !loading} path={APP_PATHS.PURCHASED}>
      <InfiniteScrollManager dataLength={fanAssets.length} loading={loading} useWindowScroll hasMore={hasMore} onLoadMore={onLoadMore}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-1">
          <AnimatePresence mode="popLayout">
            {fanAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
              >
                <Card className="group relative aspect-square overflow-hidden border-none bg-secondary/15 hover:bg-secondary/25 shadow-none transition-all duration-300 rounded-[1.5rem] md:rounded-[2rem]">
                  <CardContent className="p-0 h-full w-full">
                    <Image
                      width={400}
                      height={400}
                      src={asset.rawUrl}
                      alt="Purchased asset"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-end">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Status</span>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Full Access</span>
                      </div>
                    </div>
                  </CardContent>
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
  );
};
