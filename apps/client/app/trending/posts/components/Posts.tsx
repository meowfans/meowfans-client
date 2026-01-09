'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { CreateCommentModal } from '@/components/modals/CreateCommentModal';
import { PageHeader } from '@/components/PageHeader';
import { PostsGalleryOptions } from '@/components/PostsGalleryOptions';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { usePosts } from '@/hooks/usePosts';
import { PostsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useState } from 'react';

const TrendingPosts = () => {
  const { fan } = useFan();
  const [commentPost, setCommentPost] = useState<PostsEntity | null>(null);
  const { posts, loadPosts, hasMore, loading, handleRefresh } = usePosts({
    take: 30,
    sortBy: SortBy.PostLikeCount,
    orderBy: SortOrder.Desc,
    fanId: fan?.fanId
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
          renderOverlay={(post) => <PostsGalleryOptions post={post} setCommentPost={setCommentPost} />}
        />
      </InfiniteScrollManager>
      {commentPost && <CreateCommentModal isOpen={!!commentPost} postId={commentPost.id} onClose={() => setCommentPost(null)} />}
    </PageManager>
  );
};

export default TrendingPosts;
