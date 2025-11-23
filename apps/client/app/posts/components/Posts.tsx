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

export const Posts = () => {
  const { fan } = useFan();
  const { getPosts } = usePosts();
  const [commentPost, setCommentPost] = useState<PostsEntity | null>(null);
  const { posts, loading, handleLoadMore, hasMore, onRefresh } = getPosts({
    fanId: fan?.fanId,
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
        onRefresh={onRefresh}
      >
        <PageHeader title="Explore posts" />
        <GalleryManager
          loading={loading}
          items={posts}
          getKey={(post) => post.id}
          getImageUrl={(post) => post.preview}
          applyLink
          renderOverlay={(post) => <PostsGalleryOptions post={post} setCommentPost={setCommentPost} />}
        />
      </InfiniteScrollManager>
      {commentPost && <CreateCommentModal isOpen={!!commentPost} postId={commentPost.id} onClose={() => setCommentPost(null)} />}
    </PageManager>
  );
};
