'use client';

import { BlurImage } from '@/components/BlurImage';
import { InteractionButton } from '@/components/InteractionButton';
import { PaymentModal } from '@/components/PaymentModal';
import { useLikeMutations } from '@/hooks/useLikeMutations';
import { useSinglePost } from '@/hooks/usePosts';
import { PurchaseType } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Carousel, FileType } from '@workspace/ui/globals/Carousel';
import { Loading } from '@workspace/ui/globals/Loading';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Lock, MessageSquare, MoreVertical, Share2, ShoppingCart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PostComments } from './PostComments';

interface PostDetailViewProps {
  id: string;
}

export function PostDetailView({ id }: PostDetailViewProps) {
  const router = useRouter();
  const { post, loading } = useSinglePost({ postId: id });
  const { likePost } = useLikeMutations();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loading />
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/30 animate-pulse">
            Loading Premium Content
          </p>
        </div>
      </div>
    );
  }

  if ((!post && !loading) || !post.id) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 rounded-[2rem] bg-secondary/20 p-8">
          <Sparkles className="h-12 w-12 text-muted-foreground/30" />
        </div>
        <h2 className="text-3xl ">Content Missing</h2>
        <p className="mt-2 text-muted-foreground max-w-xs opacity-60">This post might have been moved or the creator decided to hide it.</p>
        <Button
          onClick={() => router.back()}
          variant="link"
          className="mt-6 text-primary font-black uppercase italic tracking-widest text-xs"
        >
          Go Back
        </Button>
      </div>
    );
  }

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await likePost(id);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* Immersive Background Blur */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {post.preview && (
          <Image
            src={post.preview}
            alt="decorative-background"
            fill
            className="object-cover opacity-10 blur-[100px] saturate-200 scale-125"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
        <div className="mx-auto w-full max-w-2xl px-4 py-6 md:py-10">
          {/* Header Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 md:h-12 md:w-12 rounded-[1rem] md:rounded-[1.25rem] bg-secondary/20 hover:bg-secondary/40 border border-white/5 shadow-xl transition-all active:scale-90"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <div className="flex gap-2 md:gap-3">
              {post.unlockPrice && !post.isPurchased && (
                <Badge className="bg-primary px-3 md:px-5 py-1 md:py-2 rounded-full font-black uppercase italic tracking-tighter shadow-lg shadow-primary/30 text-[10px] md:text-xs">
                  Premium Drop
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 md:h-12 md:w-12 rounded-[1rem] md:rounded-[1.25rem] bg-secondary/20 hover:bg-secondary/40 border border-white/5 shadow-xl transition-all"
              >
                <Share2 className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 md:h-12 md:w-12 rounded-[1rem] md:rounded-[1.25rem] bg-secondary/20 hover:bg-secondary/40 border border-white/5 shadow-xl transition-all"
              >
                <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>

          {/* Post Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="overflow-hidden border border-white/5 bg-secondary/[0.03] backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[2rem] md:rounded-[3rem]">
              {/* Creator Bar */}
              <div className="flex items-center p-4 md:p-6 md:px-8 border-b border-white/5 bg-white/[0.02]">
                <Link href={`/creators/${post.creatorUsername}`} className="group flex items-center gap-3 md:gap-4">
                  <div className="border-2 border-primary/20 rounded-full p-0.5 shadow-2xl transition-transform group-hover:scale-105 flex-shrink-0">
                    <SAvatar url={post.creatorAvatarUrl} className="h-10 w-10 md:h-12 md:w-12" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm md:text-base  text-foreground group-hover:text-primary transition-colors truncate">
                      {post.creatorUsername}
                    </span>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 truncate">
                      {post.createdAt && formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Media Section */}
              <div className="relative w-full bg-black/40">
                {post.isPurchased || !post.unlockPrice ? (
                  <Carousel
                    items={post.postAssets}
                    getKey={(item) => item.assetId}
                    getUrl={(item) => item.rawUrl}
                    getFileType={(item) => item.fileType as FileType}
                    urls={post.postAssets?.map((a) => a.rawUrl) || [post.preview]}
                  />
                ) : (
                  <div className="relative aspect-[4/5] md:aspect-video w-full overflow-hidden">
                    {post.preview ? (
                      <BlurImage
                        src={post.preview}
                        alt={post.caption || 'Post media'}
                        className="h-full w-full object-contain"
                        loading="eager"
                      />
                    ) : (
                      <div className="h-full w-full bg-secondary/10 flex items-center justify-center">
                        <Sparkles className="h-10 w-10 text-muted-foreground/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 bg-black/60 backdrop-blur-xl">
                      <div className="mb-4 md:mb-6 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 p-6 md:p-8 border border-white/10 shadow-2xl rotate-3">
                        <Lock className="h-10 w-10 md:h-16 md:w-16 text-primary" />
                      </div>
                      <h3 className="text-xl md:text-3xl font-[900] italic uppercase tracking-tighter text-white mb-2 text-center">
                        Content Locked
                      </h3>
                      <p className="text-xs md:text-sm font-medium text-white/50 mb-6 md:mb-8 max-w-xs text-center px-4">
                        Unlock this drop for full access to {post.postAssets.length} exclusive items.
                      </p>

                      <InteractionButton
                        onClick={() => setIsPaymentModalOpen(true)}
                        actionName="Unlock Post"
                        className="h-12 md:h-16 px-6 md:px-10 rounded-[1rem] md:rounded-[2rem] bg-primary text-primary-foreground font-black uppercase italic tracking-widest shadow-[0_15px_30px_-5px_rgba(var(--primary),0.4)] hover:scale-105 transition-all text-xs md:text-base w-full md:w-auto"
                      >
                        <ShoppingCart className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5" />
                        Unlock for ${post.unlockPrice}
                      </InteractionButton>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <CardContent className="p-6 md:p-10">
                <div className="mb-6 md:mb-8">
                  <p className="text-base md:text-xl font-bold leading-relaxed text-foreground/90">
                    {post.caption || <span className="italic opacity-30 font-medium">No caption provided...</span>}
                  </p>
                </div>

                {/* Engagement Bar */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pt-6 md:pt-8 border-t border-white/5">
                  <div className="flex items-center gap-4 md:gap-6">
                    <button
                      onClick={handleLike}
                      className="flex items-center gap-2 md:gap-3 group transition-transform active:scale-90 text-left"
                    >
                      <div
                        className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-[0.75rem] md:rounded-[1.25rem] border border-white/5 transition-all ${post.isLiked ? 'bg-red-500/10 border-red-500/20' : 'bg-secondary/20 group-hover:bg-secondary/40'}`}
                      >
                        <Heart
                          className={`h-4 w-4 md:h-6 md:w-6 transition-all ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground/60 group-hover:text-foreground'}`}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">
                          Appreciation
                        </span>
                        <span className="text-xs md:text-sm font-black italic tracking-tighter uppercase">
                          {post.isLiked ? 'Loved' : 'Love'}
                        </span>
                      </div>
                    </button>

                    <button className="flex items-center gap-2 md:gap-3 group transition-transform active:scale-90 text-left">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-[0.75rem] md:rounded-[1.25rem] border border-white/5 bg-secondary/20 group-hover:bg-secondary/40 transition-all">
                        <MessageSquare className="h-4 w-4 md:h-6 md:w-6 text-muted-foreground/60 group-hover:text-foreground" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">
                          Join Chat
                        </span>
                        <span className="text-xs md:text-sm font-black italic tracking-tighter uppercase">Discuss</span>
                      </div>
                    </button>
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center justify-center gap-6 md:gap-8 px-4 md:px-6 py-2 md:py-3 rounded-full bg-secondary/10 border border-white/5 w-fit self-center md:self-auto">
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] md:text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest leading-none mb-1">
                        Items
                      </span>
                      <span className="text-sm md:text-base font-black italic tracking-tighter leading-none">{post.postAssets.length}</span>
                    </div>
                    <div className="h-4 md:h-6 w-[1px] bg-white/5" />
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] md:text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest leading-none mb-1">
                        Views
                      </span>
                      <span className="text-sm md:text-base font-black italic tracking-tighter leading-none">{post.viewCount || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Comments Section */}
          <PostComments postId={id} />
        </div>
      </div>
      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        amount={Number(post?.unlockPrice || 0)}
        entityId={id}
        creatorId={post?.creatorId || ''}
        purchaseType={PurchaseType.Post}
        title="Unlock Premium Post"
        description="Get instant access to this exclusive drop from the creator."
      />
    </div>
  );
}
