'use client';

import { getPublicCreatorPosts } from '@/app/server/getPublicCreatorPosts';
import { usePostsStore } from '@/hooks/store/posts.store';
import { GetPublicPostsOutput, PaginationInput, PostTypes, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerPublicCreatorPosts = (params: PaginationInput, initialPosts: GetPublicPostsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { creatorPosts, setCreatorPosts } = usePostsStore();
  const [loading, setLoading] = useState<boolean>(initialPosts.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialPosts.length === (params.take ?? 30));
  const [skip, setSkip] = useState<number>(initialPosts.length);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getPublicCreatorPosts({
        ...params,
        take: params.take ?? 30,
        skip,
        sortBy: params.sortBy ?? SortBy.PostCreatedAt,
        orderBy: params.orderBy ?? SortOrder.Desc,
        postTypes: params.postTypes ?? Object.values(PostTypes)
      });

      const fetchedPosts = (fetched ?? []) as GetPublicPostsOutput[];
      setHasMore(fetchedPosts.length === (params.take ?? 30));
      setCreatorPosts((prev) => [...prev, ...fetchedPosts]);
      setSkip((prev) => prev + (params.take ?? 30));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading creator posts! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialPosts?.length > 0) {
      setCreatorPosts(initialPosts);
    }
  }, [initialPosts, setCreatorPosts]);

  return {
    creatorPosts,
    loading,
    hasMore,
    loadMore
  };
};
