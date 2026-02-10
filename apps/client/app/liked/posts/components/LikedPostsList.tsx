import { BlurImage } from '@/components/BlurImage';
import { BlurVideo } from '@/components/BlurVideo';
import { FileType, GetLikedPostsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MessageSquare, MoreVertical, Share2 } from 'lucide-react';
import Link from 'next/link';

interface LikedPostsListProps {
  items: GetLikedPostsOutput[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const LikedPostsList = ({ items, loading, hasMore, onLoadMore }: LikedPostsListProps) => {
  return (
    <InfiniteScrollManager dataLength={items.length} loading={loading} hasMore={hasMore} onLoadMore={onLoadMore}>
      <div className="space-y-4 md:space-y-6">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
            >
              <Link href={`/posts/${item.id}`}>
                <Card className="overflow-hidden border-none bg-secondary/15 hover:bg-secondary/25 transition-all duration-300 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-6 group cursor-pointer shadow-none hover:shadow-2xl hover:shadow-primary/5">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="relative w-full md:w-[180px] lg:w-[200px] aspect-video md:aspect-square rounded-[1rem] md:rounded-[2rem] overflow-hidden bg-muted/20 shrink-0">
                      {item.fileType === FileType.Video ? (
                        <BlurVideo
                          src={item.preview as string}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <BlurImage
                          src={item.preview as string}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                          alt="Post preview"
                        />
                      )}
                      <div className="absolute top-3 right-3 md:top-4 md:right-4 h-7 w-7 md:h-8 md:w-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                        <Heart className="h-3.5 w-3.5 md:h-4 md:w-4 fill-white" />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-0 md:py-1">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <span className="text-[10px] uppercase font-black text-muted-foreground/40 tracking-[0.2em]">
                                Premium Access
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8 md:h-10 md:w-10 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                        <p className="text-sm md:text-base font-bold leading-relaxed line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
                          {/* Placeholder for caption */}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/5 mt-4 md:mt-0">
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <Heart className="h-3.5 w-3.5 md:h-4 md:w-4 fill-red-500 text-red-500" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
                              Liked
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2 group/btn">
                            <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground/60 group-hover/btn:text-primary transition-colors" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
                              Discuss
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2 group/btn">
                            <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground/60 group-hover/btn:text-primary transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {loading && (
        <div className="py-20 flex justify-center">
          <Loading />
        </div>
      )}
    </InfiniteScrollManager>
  );
};
