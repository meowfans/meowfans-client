'use client';

import { useLikes } from '@/hooks/useLikes';
import { PostsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { MultipleObjectsIcon } from '@workspace/ui/globals/MultipleObjectsIcon';
import { formatDate } from '@workspace/ui/lib';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { AuthAwareButton } from './AuthAwareButton';
import { CommentButton } from './CommentButton';
import { LikeButton } from './LikeButton';

interface PostsGalleryOptionsProps {
  post: PostsEntity;
  setCommentPost: React.Dispatch<React.SetStateAction<PostsEntity | null>>;
}

export const PostsGalleryOptions: React.FC<PostsGalleryOptionsProps> = ({ post, setCommentPost }) => {
  const router = useRouter();
  const { likePost } = useLikes();
  const handleLikePost = useDebouncedCallback(likePost, 250);

  return (
    <div
      className={`
        relative flex flex-col justify-between h-full w-full
        rounded-xl overflow-hidden
        bg-gradient-to-b from-black/10 via-black/20 to-black/40
      `}
    >
      <div className="absolute top-2 right-2 z-10">
        <Badge
          variant="secondary"
          className="flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-md"
          title="Created at"
        >
          {formatDate(post.createdAt)}
        </Badge>
      </div>

      {!post.isPurchased && (
        <div
          className={`
            absolute inset-0 flex flex-col items-center justify-center text-center
            z-10 backdrop-blur-sm bg-black/40 p-4 rounded-xl
          `}
        >
          <AuthAwareButton
            size="default"
            className="h-fit w-fit px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold"
            onClick={() => router.push(`/posts/${post.id}`)}
          >
            Unlock for ${post.unlockPrice}
          </AuthAwareButton>
          <p
            className={`
              text-xs sm:text-sm mt-2 text-transparent bg-clip-text
              bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
              font-medium leading-snug
            `}
          >
            Unlock this post and all exclusive assets for ${post.unlockPrice}
          </p>
        </div>
      )}

      <div
        className={`
          absolute bottom-0 inset-x-0 z-10
          bg-gradient-to-t from-black/80 via-black/30 to-transparent
          p-3 flex justify-between items-end
        `}
      >
        <p title="Caption" className="truncate text-xs sm:text-sm md:text-base text-white max-w-[70%]">
          {post.caption || 'No caption'}
        </p>

        <div className="flex gap-2 items-center">
          {post.isPurchased && (
            <>
              <LikeButton
                isLiked={post.isLiked}
                className="hover:text-red-500 rounded-xl transition pointer-events-auto"
                variant="secondary"
                size="sm"
                title="Like"
                onLikeDisLike={() => handleLikePost(post.id)}
              />
              <CommentButton onClick={() => setCommentPost(post)} className="rounded-xl text-white hover:text-blue-400" title="Comment" />
            </>
          )}
          <MultipleObjectsIcon hasMultiple={post.objectCount > 1} />
        </div>
      </div>
    </div>
  );
};
