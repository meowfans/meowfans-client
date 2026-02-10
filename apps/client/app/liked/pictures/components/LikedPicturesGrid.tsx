import { BlurImage } from '@/components/BlurImage';
import { BlurVideo } from '@/components/BlurVideo';
import { FileType, GetLikedVaultObjectsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Expand, Heart } from 'lucide-react';

interface LikedPicturesGridProps {
  items: GetLikedVaultObjectsOutput[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const LikedPicturesGrid = ({ items, loading, hasMore, onLoadMore }: LikedPicturesGridProps) => {
  return (
    <InfiniteScrollManager dataLength={items.length} loading={loading} hasMore={hasMore} onLoadMore={onLoadMore}>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 px-0.5">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
              className="break-inside-avoid mb-4 md:mb-6"
            >
              <Card className="group relative overflow-hidden border-none bg-secondary/15 hover:bg-secondary/25 transition-all duration-300 shadow-none hover:shadow-2xl hover:shadow-primary/5 rounded-[1.5rem] md:rounded-[2rem] cursor-zoom-in">
                <div className="relative flex flex-col">
                  {item.fileType === FileType.Video ? (
                    <BlurVideo
                      src={item.preview as string}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <BlurImage
                      src={item.preview as string}
                      alt="Liked capture"
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-4 md:p-6">
                    <div className="flex justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Button
                        size="icon"
                        className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/20 border-none scale-90 group-hover:scale-100 transition-transform"
                      >
                        <Heart className="h-4 w-4 fill-white" />
                      </Button>
                    </div>

                    <div className="flex flex-col gap-3 md:gap-4 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 md:gap-3 min-w-0">
                          <div className="h-7 w-7 md:h-8 md:w-8 rounded-full border border-white/20 overflow-hidden bg-white/10 flex-shrink-0">
                            <div className="w-full h-full flex items-center justify-center text-[8px] md:text-[10px] font-black text-white">
                              MF
                            </div>
                          </div>
                          <span className="text-[9px] md:text-[10px] font-black uppercase text-white/90 tracking-widest truncate">
                            Premium Asset
                          </span>
                        </div>
                        <div className="flex gap-1.5 md:gap-2 shrink-0">
                          <Button
                            size="icon"
                            className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white"
                          >
                            <Expand className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          </Button>
                        </div>
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
  );
};
