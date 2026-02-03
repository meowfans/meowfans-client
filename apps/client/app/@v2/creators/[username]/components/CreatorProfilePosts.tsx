'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { CreateCommentModal } from '@/components/modals/CreateCommentModal';
import { PostsGalleryOptions } from '@/components/PostsGalleryOptions';
import { useCommentsStore } from '@/hooks/store/comments.store';
import { usePosts } from '@/hooks/usePosts';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';

interface Props {
  username: string;
}

export const CreatorProfilePosts: React.FC<Props> = ({ username }) => {
  const { commentOnPost } = useCommentsStore();
  const { posts, handleLoadMore, hasMore, loading, handleRefresh } = usePosts({
    username,
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Desc
  });

  return (
    <InfiniteScrollManager
      dataLength={posts.length}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={handleLoadMore}
      onRefresh={handleRefresh}
      scrollableDiv="v2-main-content"
    >
      <GalleryManager
        layout="grid"
        loading={loading}
        items={posts}
        getKey={(post) => post.id}
        getImageUrl={(post) => post.preview}
        applyLink
        pathname="/posts"
        renderOverlay={(post) => <PostsGalleryOptions post={post} />}
      />
      {commentOnPost && <CreateCommentModal />}
    </InfiniteScrollManager>
  );
};
