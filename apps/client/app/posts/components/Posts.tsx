'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { CreateCommentModal } from '@/components/modals/CreateCommentModal';
import { PageHeader } from '@/components/PageHeader';
import { PostsGalleryOptions } from '@/components/PostsGalleryOptions';
import { useCommentsStore } from '@/hooks/store/comments.store';
import { usePosts } from '@/hooks/usePosts';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';

export const Posts = () => {
  const { commentOnPost } = useCommentsStore();
  const { posts, loading, handleLoadMore, hasMore, handleRefresh } = usePosts({
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Desc
  });

  return (
    <PageManager>
      <InfiniteScrollManager
        dataLength={posts.length}
        hasMore={hasMore}
        loading={loading}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
      >
        <PageHeader title="Explore posts" />
        <GalleryManager
          applyLink
          items={posts}
          loading={loading}
          getKey={(post) => post.id}
          getImageUrl={(post) => post.preview}
          renderOverlay={(post) => <PostsGalleryOptions post={post} />}
        />
      </InfiniteScrollManager>
      {commentOnPost && <CreateCommentModal />}
    </PageManager>
  );
};
