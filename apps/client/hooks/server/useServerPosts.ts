'use client';

import { getPosts } from '@/app/server/getPosts';
import { usePostsStore } from '@/hooks/store/posts.store';
import { GetPublicPostsOutput, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useCallback, useEffect, useState } from 'react';

export const useServerPosts = (params: PaginationInput, initialPosts: GetPublicPostsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { posts, setPosts } = usePostsStore();
  const [loading, setLoading] = useState<boolean>(initialPosts.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialPosts.length > 0 ? initialPosts.length === (params.take ?? 30) : true);
  const [skip, setSkip] = useState<number>(initialPosts.length);

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const fetched = await getPosts({
        take: params.take ?? 30,
        skip,
        sortBy: params.sortBy ?? SortBy.PostCreatedAt,
        orderBy: params.orderBy ?? SortOrder.Desc,
        ...params
      });

      const fetchedPosts = (fetched ?? []) as GetPublicPostsOutput[];
      setHasMore(fetchedPosts.length === (params.take ?? 30));
      setPosts((prev) => [...prev, ...fetchedPosts]);
      setSkip((prev) => prev + (params.take ?? 30));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading posts! Try again later.' });
    } finally {
      setLoading(false);
    }
  }, [params, skip, setPosts, errorHandler]);

  useEffect(() => {
    if (initialPosts?.length > 0 && posts.length === 0) {
      setPosts(initialPosts);
    }
  }, [initialPosts, setPosts, posts.length]);

  // Initial load for client-side cases (e.g. tabs)
  useEffect(() => {
    if (initialPosts.length === 0 && posts.length === 0 && !loading && hasMore) {
      loadMore();
    }
  }, [initialPosts.length, posts.length, loading, hasMore, loadMore]);

  return {
    posts,
    loading,
    hasMore,
    loadMore
  };
};
