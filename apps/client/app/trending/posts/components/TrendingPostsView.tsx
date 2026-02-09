'use client';

import { BlurImage } from '@/components/BlurImage';
import { usePosts } from '@/hooks/usePosts';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Heart, MessageSquare, MoreVertical, Share2, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export function TrendingPostsView() {
  const { posts, handleLoadMore, hasMore, loading } = usePosts({
    sortBy: SortBy.PostCreatedAt, // Ideally we'd have Trending score, but CreatedAt works for mock/recents
    orderBy: SortOrder.Desc,
    take: 20
  });

  if (loading ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Scanning Social Pulse</p>
      </div>
    );
  }

  if(!posts.length && !loading){
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Trending Posts Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-3 md:p-8 pt-4 md:pt-0 max-w-4xl mx-auto w-full pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col gap-6 px-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 flex-shrink-0">
              <Zap className="h-5 w-5 md:h-6 md:w-6 text-purple-500 fill-purple-500" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic truncate">The Pulse</h1>
              <p className="text-muted-foreground text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] truncate">
                Live feed of talked-about updates
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center bg-secondary/30 rounded-full px-4 py-2 border border-border/50 gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Live</span>
            </div>
            <div className="h-4 w-1 border-l border-border/50" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">3.2k Content pieces / hr</span>
          </div>
        </div>
      </div>

      <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={handleLoadMore}>
        <div className="space-y-4 md:space-y-6 px-1">
          <AnimatePresence mode="popLayout">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.1, 0.5) }}
              >
                <Link href={`/posts/${post.id}`}>
                  <Card className="overflow-hidden border-none bg-secondary/15 hover:bg-secondary/25 transition-all duration-300 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-6 group cursor-pointer shadow-none hover:shadow-2xl hover:shadow-primary/5">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Preview Media */}
                      <div className="relative w-full md:w-[240px] aspect-[4/5] md:aspect-square rounded-[1rem] md:rounded-[2rem] overflow-hidden bg-muted/20 shrink-0">
                        <BlurImage
                          src={post.preview}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                          alt="Post preview"
                        />
                        <Badge className="absolute top-3 left-3 md:top-4 md:left-4 bg-background/60 backdrop-blur-md border-none text-[9px] md:text-[10px] font-black uppercase px-2.5 md:px-3 h-6 md:h-7 rounded-full gap-1.5 shadow-lg">
                          <TrendingUp className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary" />
                          Viral
                        </Badge>
                      </div>

                      {/* Post Details */}
                      <div className="flex-1 flex flex-col justify-between py-1 md:py-2 min-w-0">
                        <div className="space-y-3 md:space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3 min-w-0">
                              <SAvatar url={post.creatorAvatarUrl} className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0" />
                              <div className="flex flex-col min-w-0">
                                <span className="font-black text-xs md:text-sm uppercase italic tracking-tight truncate">
                                  @{post.creatorUsername}
                                </span>
                                <span className="text-[8px] md:text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest truncate">
                                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                              <MoreVertical className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground" />
                            </Button>
                          </div>

                          <p className="text-sm md:text-base font-semibold leading-relaxed line-clamp-2 md:line-clamp-4 text-foreground/90">
                            {post.caption || 'A new masterpiece from the studio...'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-border/50 mt-4 md:mt-0">
                          <div className="flex items-center gap-4 md:gap-6">
                            <div className="flex items-center gap-1.5 md:gap-2 group/btn">
                              <Heart
                                className={`h-3.5 w-3.5 md:h-4 md:w-4 ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground group-hover/btn:text-red-500'} transition-colors`}
                              />
                              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                {Math.floor(Math.random() * 15) + 1}k
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 md:gap-2 group/btn">
                              <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                {Math.floor(Math.random() * 15) + 1}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 md:gap-2 group/btn">
                              <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 md:gap-2 bg-primary/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full shrink-0">
                            <Flame className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary fill-primary" />
                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] text-primary">Hot</span>
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
    </div>
  );
}
