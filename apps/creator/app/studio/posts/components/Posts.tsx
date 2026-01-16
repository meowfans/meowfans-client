'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { usePostsInfo } from '@/hooks/usePosts';
import { SortingState } from '@tanstack/react-table';
import { PostTypes, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useState } from 'react';
import { PostHeader } from './PostHeader';
import { PostShareCard } from './PostShareCard';
import { PostTable } from './PostTable';

export const Posts = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [postType, setPostType] = useState<PostTypes[]>(Object.values(PostTypes));
  const { shareModal } = useUtilsStore();

  console.log({ postType });

  const { postsInfo, hasMore, loading, handleLoadMore } = usePostsInfo({
    take: 30,
    searchTerm: searchTerm || undefined,
    postTypes: postType,
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
        <PostTable postsInfo={postsInfo} setSorting={setSorting} sorting={sorting} />
        {shareModal && <PostShareCard post={shareModal} shareUrl={`https://meowfans.app/posts/${shareModal.id}`} />}
      </InfiniteScrollManager>
    </PageManager>
  );
};
