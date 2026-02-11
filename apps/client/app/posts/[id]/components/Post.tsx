'use client';

import { PaymentModal } from '@/components/PaymentModal';
import { ReportModal } from '@/components/ReportModal';
import { useLikeMutations } from '@/hooks/client/useLikeMutations';
import { useServerSinglePost } from '@/hooks/server/useServerSinglePost';
import { EntityType, GetPublicSinglePostOutput, PurchaseType } from '@workspace/gql/generated/graphql';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Loading } from '@workspace/ui/globals/Loading';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PostComments } from './PostComments';
import { PostDetailCreatorBar } from './PostDetailCreatorBar';
import { PostDetailEngagement } from './PostDetailEngagement';
import { PostDetailHeader } from './PostDetailHeader';
import { PostDetailMedia } from './PostDetailMedia';

interface SinglePostProps {
  initialPost: GetPublicSinglePostOutput | null;
}

export function SinglePost({ initialPost }: SinglePostProps) {
  const router = useRouter();
  const { post, loading } = useServerSinglePost({ postId: initialPost?.id as string }, initialPost);
  const { likePost } = useLikeMutations();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Content Missing</h2>
        <p className="mt-2 text-muted-foreground max-w-xs opacity-60">This post might have been moved or the creator decided to hide it.</p>
        <button
          onClick={() => router.back()}
          className="mt-6 text-primary font-black uppercase italic tracking-widest text-xs hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isLocked = !!(post.unlockPrice && !post.isPurchased);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLocked) return;
    await likePost(post.id);
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
          <PostDetailHeader unlockPrice={post.unlockPrice} isPurchased={post.isPurchased} onReport={() => setIsReportModalOpen(true)} />

          {/* Post Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="overflow-hidden border border-white/5 bg-secondary/[0.03] backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[2rem] md:rounded-[3rem]">
              <PostDetailCreatorBar
                creatorUsername={post.creatorUsername}
                creatorAvatarUrl={post.creatorAvatarUrl}
                createdAt={post.createdAt}
              />

              <PostDetailMedia
                isPurchased={post.isPurchased}
                unlockPrice={post.unlockPrice}
                postAssets={post.postAssets}
                preview={post.preview}
                caption={post.caption}
                onUnlock={() => setIsPaymentModalOpen(true)}
              />

              <CardContent className="p-6 md:p-10">
                <div className="mb-6 md:mb-8">
                  <p className="text-base md:text-xl font-bold leading-relaxed text-foreground/90">
                    {post.caption || <span className="italic opacity-30 font-medium">No caption provided...</span>}
                  </p>
                </div>

                <PostDetailEngagement
                  isLiked={post.isLiked}
                  onLike={handleLike}
                  isLocked={isLocked}
                  itemCount={post.postAssets.length}
                  viewCount={post.viewCount}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Comments Section */}
          <PostComments postId={post.id} isLocked={isLocked} />
        </div>
      </div>

      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        amount={Number(post.unlockPrice || 0)}
        entityId={post.id}
        creatorId={post.creatorId || ''}
        purchaseType={PurchaseType.Post}
        title="Unlock Premium Post"
        description="Get instant access to this exclusive drop from the creator."
      />

      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} entityId={post.id} entityType={EntityType.Post} />
    </div>
  );
}
