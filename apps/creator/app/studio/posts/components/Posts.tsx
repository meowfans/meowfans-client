'use client';

import { usePostsInfo } from '@/hooks/usePosts';
import { PostTypes, SortOrder } from '@workspace/gql/generated/graphql';
import { ExtendedCard } from '@workspace/ui/globals/ExtendedCard';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useState } from 'react';
import { PostActionsBar } from './PostActionsBar';
import { PostDetails } from './PostDetails';
import { PostHeader } from './PostHeader';

export const Posts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [postType, setPostType] = useState<PostTypes[]>(Object.values(PostTypes));
  const { handleLoadMore, hasMore, loading, postsInfo } = usePostsInfo({
    take: 30,
    searchTerm: searchTerm || undefined,
    postTypes: postType ? undefined : [postType],
    orderBy
  });

  return (
    <PageManager>
      <InfiniteScrollManager dataLength={postsInfo.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
        <PostHeader
          orderBy={orderBy}
          postType={postType}
          searchTerm={searchTerm}
          setOrderBy={setOrderBy}
          setPostTypes={setPostType}
          setSearchTerm={setSearchTerm}
        />
        <div className="grid grid-cols-1 gap-4">
          {postsInfo.map((post) => {
            const isDeleted = Boolean(post.deletedAt);
            return (
              <ExtendedCard
                key={post.id}
                title={post.caption ?? 'Untitled'}
                className={`relative group overflow-hidden ${isDeleted ? 'opacity-60 grayscale' : ''}`}
                contentClassName="grid grid-cols-1 gap-4"
              >
                <PostActionsBar disabled={isDeleted} />
                <PostDetails isDeleted={isDeleted} post={post} />
              </ExtendedCard>
            );
          })}
        </div>
      </InfiniteScrollManager>
    </PageManager>
  );
};
