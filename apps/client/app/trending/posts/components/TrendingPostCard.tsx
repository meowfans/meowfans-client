'use client';

import { BlurImage } from '@/components/BlurImage';
import { GetPublicPostsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Flame, Heart, MessageSquare, MoreVertical, Share2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface TrendingPostCardProps {
  post: GetPublicPostsOutput;
  index: number;
}

export function TrendingPostCard({ post, index }: TrendingPostCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.1, 0.5) }}>
      <Link href={`/posts/${post.id}`}>
        <Card className="overflow-hidden border-none bg-secondary/15 hover:bg-secondary/25 transition-all duration-300 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-6 group cursor-pointer shadow-none hover:shadow-2xl hover:shadow-primary/5">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Preview Media */}
            <div className="relative w-full md:w-[240px] aspect-[4/5] md:aspect-square rounded-[1rem] md:rounded-[2rem] overflow-hidden bg-muted/20 shrink-0">
              <BlurImage
                src={post.preview as string}
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
                    <SAvatar url={post.creatorAvatarUrl as string} className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0" />
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
  );
}
