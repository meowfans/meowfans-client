import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { PurchaseSheet } from '@/components/modals/PurchaseSheet';
import { useCommentsStore } from '@/hooks/store/comments.store';
import { useLikes } from '@/hooks/useLikes';
import { GetPublicSinglePostOutput, PurchaseType } from '@workspace/gql/generated/graphql';
import { useDebouncedCallback } from 'use-debounce';

interface SinglePostActionProps {
  post: GetPublicSinglePostOutput;
}

export const SinglePostAction: React.FC<SinglePostActionProps> = ({ post }) => {
  const { likePost } = useLikes();
  const { setCommentOnPost } = useCommentsStore();
  const handleLikePost = useDebouncedCallback(likePost, 250);

  return post.isPurchased ? (
    <div className="flex flex-row justify-between">
      <LikeButton
        className="hover:text-red-500 rounded-xl transition"
        onLikeDisLike={() => handleLikePost(post.id)}
        isLiked={post.isLiked}
      />
      <CommentButton onClick={() => setCommentOnPost(post.id)} className="rounded-xl text-white hover:text-blue-400" title="Comment" />
    </div>
  ) : (
    <div className="flex justify-center place-content-center items-center">
      {post.unlockPrice && (
        <PurchaseSheet
          entityId={post.id}
          amount={post.unlockPrice}
          purchaseType={PurchaseType.Post}
          creatorId={post.creatorId as string}
          className="h-fit w-fit"
        />
      )}
    </div>
  );
};
