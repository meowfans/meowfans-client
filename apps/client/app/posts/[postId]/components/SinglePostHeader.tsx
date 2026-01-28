'use client';

import { CommentButton } from '@/components/CommentButton';
import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { LikeButton } from '@/components/LikeButton';
import { CreateCommentModal } from '@/components/modals/CreateCommentModal';
import { PurchaseSheet } from '@/components/modals/PurchaseSheet';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useCommentsStore } from '@/hooks/store/comments.store';
import { usePostsStore } from '@/hooks/store/posts.store';
import { useLikes } from '@/hooks/useLikes';
import { PurchaseType } from '@workspace/gql/generated/graphql';
import { EllipsisDescription } from '@workspace/ui/globals/EllipsisDescription';
import { LinkDescription } from '@workspace/ui/globals/LinkDescription';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  expanded: boolean;
  onExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SinglePostHeader: React.FC<Props> = ({ onExpanded, expanded }) => {
  const { fan } = useFan();
  const { likePost } = useLikes();
  const { post, setPost } = usePostsStore();
  const { commentOnPost, setCommentOnPost } = useCommentsStore();

  const handleLikePost = useDebouncedCallback(async (postId: string) => {
    const isLiked = await likePost(postId);
    setPost((prev) =>
      prev
        ? {
            ...prev,
            isLiked: !!isLiked
          }
        : prev
    );
  }, 250);

  if (!post) return null;

  const username = post.creatorProfile?.user?.username || 'Unknown';
  const usernameUpper = username.toUpperCase();

  return (
    <div className="flex flex-col items-start gap-6 mb-10">
      <SAvatar url={post.preview} className="h-28 w-28 shrink-0 rounded-full border-4 shadow-md object-cover" />

      <div className="flex-1 min-w-62.5">
        <EllipsisDescription
          description={post.caption}
          expanded={expanded}
          onExpanded={onExpanded}
          lineClamp={3}
          className="text-base text-gray-700 dark:text-gray-300"
        />

        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {username !== 'porn' ? (
            <span>
              Captured by
              <LinkDescription
                href={`/creators/${username}`}
                description={usernameUpper}
                className="text-pink-500 hover:text-pink-400 font-medium transition-colors"
              />
              ✨ — Sharing moments of creativity and passion.
            </span>
          ) : (
            <LinkDescription href={`/creators/${username}`} className="text-pink-500 font-semibold" description={usernameUpper} />
          )}
          <ExoAdProvider zoneId="5770664" zoneType={ExoAdZoneTypes.MobileBanner} />
        </div>

        {post.isPurchased ? (
          <div className="mt-4 flex gap-2 flex-row">
            <LikeButton isLiked={!!fan && !!post.isLiked} onLikeDisLike={() => handleLikePost(post.id)} />
            <CommentButton
              variant="outline"
              title="Post a comment"
              className="flex items-center gap-2"
              titleEnabled
              onClick={() => setCommentOnPost(post)}
            />
          </div>
        ) : (
          post.unlockPrice && (
            <div
              className={`mt-4 flex flex-col gap-2 bg-linear-to-r
             from-purple-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-900
             p-4 rounded-xl border border-pink-200 dark:border-zinc-700 shadow-sm`}
            >
              <PurchaseSheet entityId={post.id} amount={post.unlockPrice} purchaseType={PurchaseType.Post} creatorId={post.creatorId} />
              <p className="text-xl text-center text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium">
                Unlock this post for just ${post.unlockPrice} — support the creator and explore exclusive content.
              </p>
            </div>
          )
        )}
      </div>
      {commentOnPost && <CreateCommentModal />}
    </div>
  );
};
