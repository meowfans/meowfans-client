'use client';

import { useCommentsStore } from '@/hooks/store/comments.store';
import { useCommentsActions } from '@workspace/gql/actions/comments.actions';
import { PaginationInput, PostCommentsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const usePostComments = ({ take, relatedEntityId }: PaginationInput) => {
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { postComments, setPostComments } = useCommentsStore();
  const { publicGetCommentsOfPostQuery } = useCommentsActions();

  const loadComments = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : postComments.length;
    setLoading(postComments.length === 0);

    try {
      const { data } = await publicGetCommentsOfPostQuery({ skip, take, relatedEntityId });
      const fetchedPostComments = data?.getPublicPostCommentsByPostId as PostCommentsEntity[];
      setHasMore(fetchedPostComments.length === take);

      if (initialLoad) setPostComments(fetchedPostComments);
      else setPostComments([...postComments, ...fetchedPostComments]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadComments();
  };

  const handleRefresh = () => {
    setPostComments([]);
    loadComments(true);
  };

  useEffect(() => {
    loadComments(true);
  }, [relatedEntityId, take]); // eslint-disable-line

  return {
    postComments,
    loading,
    hasMore,
    handleLoadMore,
    handleRefresh
  };
};
