'use client';

import { BlurImage } from '@/components/BlurImage';
import { useLikedPosts } from '@/hooks/useLikedPosts';
import { FileType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Filter, Heart, MessageSquare, MoreVertical, Search, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function LikedPostsView() {
  const { postLikes, loadMore, hasMore, loading } = useLikedPosts({ take: 30 });
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = postLikes.filter((item) => item.id.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Syncing Feed</p>
      </div>
    );
  }

  if (!postLikes.length && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Liked Posts</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-4 md:p-8 pt-4 md:pt-0 max-w-4xl mx-auto w-full pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl md:rounded-[1.5rem] bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
            <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase italic bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent truncate">
              Saved Stories
            </h1>
            <p className="text-muted-foreground text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mt-0.5 md:mt-1 truncate">
              {postLikes.length} Total Stories Captured
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 w-full lg:w-auto">
          <div className="relative group flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search captions..."
              className="pl-9 h-10 md:h-11 rounded-xl md:rounded-2xl border-border/50 bg-secondary/15 focus-visible:ring-primary/20 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 md:h-11 md:w-11 rounded-xl md:rounded-2xl border-border/50 bg-secondary/15 hover:bg-secondary/40 shrink-0"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <InfiniteScrollManager dataLength={postLikes.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore}>
        <div className="space-y-4 md:space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
              >
                <Link href={`/posts/${item.id}`}>
                  <Card className="overflow-hidden border-none bg-secondary/15 hover:bg-secondary/25 transition-all duration-300 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-6 group cursor-pointer shadow-none hover:shadow-2xl hover:shadow-primary/5">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Preview Media */}
                      <div className="relative w-full md:w-[180px] lg:w-[200px] aspect-video md:aspect-square rounded-[1rem] md:rounded-[2rem] overflow-hidden bg-muted/20 shrink-0">
                        {item.fileType === FileType.Video ? (
                          <video
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

                      {/* Post Details */}
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
                            {/* {item.caption || 'Liked post from ' + item.post.creatorUsername} */}
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

                          <div className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">
                            {/* {formatDistanceToNow(new Date(item.post.createdAt), { addSuffix: true })} */}
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
