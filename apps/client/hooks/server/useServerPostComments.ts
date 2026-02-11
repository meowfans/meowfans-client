'use client';

import { getPostComments } from '@/app/server/getPostComments';
import { useCommentsStore } from '@/hooks/store/comments.store';
import { PaginationInput, PostCommentsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerPostComments = (params: PaginationInput, initialComments: PostCommentsEntity[]) => {
  const { errorHandler } = useErrorHandler();
  const { postComments, setPostComments } = useCommentsStore();
  const [loading, setLoading] = useState<boolean>(initialComments.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialComments.length === (params.take ?? 10));
  const [skip, setSkip] = useState<number>(initialComments.length);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const fetched = await getPostComments({
        ...params,
        skip,
        take: params.take ?? 10
      });

      const fetchedComments = (fetched ?? []) as PostCommentsEntity[];
      setHasMore(fetchedComments.length === (params.take ?? 10));
      setPostComments((prev) => [...prev, ...fetchedComments]);
      setSkip((prev) => prev + (params.take ?? 10));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading comments! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialComments?.length > 0) {
      setPostComments(initialComments);
      setSkip(initialComments.length);
    }
  }, [initialComments, setPostComments]);

  return {
    postComments,
    loading,
    hasMore,
    loadMore
  };
};
