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

const TrendingPosts = () => {
  const { commentOnPost } = useCommentsStore();
  const { posts, loadPosts, hasMore, loading, handleRefresh } = usePosts({
    take: 30,
    sortBy: SortBy.PostLikeCount,
    orderBy: SortOrder.Desc
  });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={posts.length} hasMore={hasMore} loading={loading} onLoadMore={loadPosts} onRefresh={handleRefresh}>
        <PageHeader title="Top liked posts" />
        <GalleryManager
          loading={loading}
          items={posts}
          getKey={(post) => post.id}
          getImageUrl={(post) => post.preview}
          applyLink
          pathname="/posts"
          renderOverlay={(post) => <PostsGalleryOptions post={post} />}
        />
      </InfiniteScrollManager>
      {commentOnPost && <CreateCommentModal />}
    </PageManager>
  );
};

export default TrendingPosts;
