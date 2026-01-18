'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { CreateCommentModal } from '@/components/modals/CreateCommentModal';
import { PostsGalleryOptions } from '@/components/PostsGalleryOptions';
import { usePosts } from '@/hooks/usePosts';
import { PostsEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { useState } from 'react';
import { CreatorProfileHeader } from './CreatorProfileHeader';

interface Props {
  username: string;
}

export const CreatorProfilePosts: React.FC<Props> = ({ username }) => {
  const [commentPost, setCommentPost] = useState<PostsEntity | null>(null);
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
    >
      <CreatorProfileHeader />
      <TabsList>
        <TabsTrigger value={'posts'}>Posts</TabsTrigger>
        <TabsTrigger value={'vaults'}>Vaults</TabsTrigger>
      </TabsList>
      <GalleryManager
        layout="grid"
        loading={loading}
        items={posts}
        getKey={(post) => post.id}
        getImageUrl={(post) => post.preview}
        applyLink
        pathname="/posts"
        renderOverlay={(post) => <PostsGalleryOptions post={post} setCommentPost={setCommentPost} />}
      />
      {commentPost && <CreateCommentModal isOpen={!!commentPost} postId={commentPost.id} onClose={() => setCommentPost(null)} />}
    </InfiniteScrollManager>
  );
};
