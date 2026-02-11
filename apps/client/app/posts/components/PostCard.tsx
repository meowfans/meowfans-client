'use client';

import { PostComments } from '@/app/posts/[id]/components/PostComments';
import { BlurImage } from '@/components/BlurImage';
import { GetPublicPostsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Heart, Lock, MessageSquare, MoreVertical, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  post: GetPublicPostsOutput;
  isBlurEnabled: boolean;
  isExpanded: boolean;
  onToggleComments: (e: React.MouseEvent) => void;
  onLike: (e: React.MouseEvent) => void;
  onReport: (postId: string) => void;
  viewMode: 'grid' | 'list';
}

export const PostCard = ({ post, isBlurEnabled, isExpanded, onToggleComments, onLike, onReport, viewMode }: PostCardProps) => {
  const router = useRouter();
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Link href={`/posts/${post.id}`}>
        <Card className="group relative overflow-hidden border-none bg-secondary/15 hover:bg-secondary/25 transition-all duration-300 shadow-none hover:shadow-2xl hover:shadow-primary/5 rounded-[2rem]">
          {/* Preview Section */}
          <div className="relative aspect-[4/5] overflow-hidden bg-muted/20">
            <BlurImage
              src={post.preview}
              alt={post.caption}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Top Badges */}
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {post.unlockPrice && (
                <Badge className="bg-background/60 backdrop-blur-md border-white/10 text-foreground gap-1.5 h-8 px-3 rounded-full font-black">
                  <Lock className="h-3 w-3 text-primary" />${post.unlockPrice}
                </Badge>
              )}
              {post.isPurchased && (
                <Badge className="bg-primary/90 text-primary-foreground gap-1.5 h-8 px-3 rounded-full font-black shadow-lg shadow-primary/20">
                  <ShoppingCart className="h-3 w-3" />
                  UNLOCKED
                </Badge>
              )}
            </div>

            {/* Object Count */}
            {post.objectCount > 0 && (
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-black/40 backdrop-blur-sm text-white/90 border-none px-3 font-bold h-7 rounded-full text-[10px]">
                  {post.objectCount} {post.objectCount === 1 ? 'Media' : 'Medias'}
                </Badge>
              </div>
            )}

            {/* Hover Overlay */}
            {!isBlurEnabled && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex items-center gap-2 text-white/90 font-bold text-xs uppercase tracking-tighter">
                  <Heart className="h-4 w-4" />
                  <span>View Details</span>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <CardContent className="p-4 md:p-6 pb-2">
            <div className="flex flex-col gap-2 md:gap-3">
              <p className="line-clamp-2 text-xs md:text-base font-bold text-foreground/90 leading-relaxed group-hover:text-primary transition-colors">
                {post.caption || <span className="italic opacity-30">No caption provided...</span>}
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 min-w-0">
                  <SAvatar
                    url={post.creatorAvatarUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(`/creators/${post.creatorUsername}`);
                    }}
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 truncate">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 rounded-full transition-all ${isExpanded ? 'bg-primary/20 text-primary' : 'hover:bg-secondary/40 text-muted-foreground/60'}`}
                    onClick={(e) => {
                      if (post.unlockPrice && !post.isPurchased) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      onToggleComments(e);
                    }}
                  >
                    {post.unlockPrice && !post.isPurchased ? (
                      <Lock className="h-4 w-4 opacity-40" />
                    ) : (
                      <MessageSquare className={`h-4 w-4 ${isExpanded ? 'fill-primary text-primary' : ''}`} />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 rounded-full transition-all ${post.isLiked ? 'bg-red-500/10 text-red-500' : 'hover:bg-secondary/40 text-muted-foreground/60'}`}
                    onClick={onLike}
                  >
                    {post.unlockPrice && !post.isPurchased ? (
                      <Lock className="h-4 w-4 opacity-40" />
                    ) : (
                      <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    )}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full hover:bg-secondary/40"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <MoreVertical className="h-4 w-4 text-muted-foreground/60" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-40 rounded-xl bg-background/80 backdrop-blur-xl border-white/10"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <DropdownMenuItem
                        className="gap-2 cursor-pointer focus:bg-destructive/10 focus:text-destructive"
                        onClick={() => onReport(post.id)}
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <span>Report</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Expandable Comments Section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-white/5 bg-black/20"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div className="p-4 md:p-6 pt-2">
                  <PostComments postId={post.id} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </Link>
    </motion.div>
  );
};
