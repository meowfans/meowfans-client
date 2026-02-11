'use client';

import { getLikedPosts } from '@/app/server/getLikedPosts';
import { useLikesStore } from '@/hooks/store/likes.store';
import { GetLikedPostsOutput, PaginationInput, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerLikedPosts = (params: PaginationInput, initialLikes: GetLikedPostsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { postLikes, setPostLikes } = useLikesStore();
  const [loading, setLoading] = useState<boolean>(initialLikes.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialLikes.length === params.take);
  const [skip, setSkip] = useState<number>(params.take ?? 20);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getLikedPosts({
        ...params,
        skip,
        take: params.take ?? 20,
        orderBy: params.orderBy ?? SortOrder.Desc
      });

      const fetchedLikes = (fetched ?? []) as GetLikedPostsOutput[];
      setHasMore(fetchedLikes.length === (params.take ?? 20));
      setPostLikes((prev) => [...prev, ...fetchedLikes]);
      setSkip((prev) => prev + (params.take ?? 20));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading liked posts! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialLikes?.length > 0) {
      setPostLikes(initialLikes);
    }
  }, [initialLikes, setPostLikes]);

  return {
    postLikes,
    loading,
    hasMore,
    loadMore
  };
};
