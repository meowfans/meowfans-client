import { useLikesActions } from '@workspace/gql/actions/likes.actions';
import { GetLikedPostsOutput, PaginationInput, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useFan } from '../context/UserContextWrapper';
import { useLikesStore } from '../store/likes.store';

export const useLikedPosts = (input: PaginationInput) => {
  const { fan } = useFan();
  const { getLikedPostsQuery } = useLikesActions();
  const { postLikes, setPostLikes } = useLikesStore();
  const { errorHandler } = useErrorHandler();

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadLikes = async (initial = false) => {
    const skip = initial ? 0 : postLikes.length;
    setLoading(postLikes.length === 0);

    try {
      const { data } = await getLikedPostsQuery({
        ...input,
        skip,
        orderBy: SortOrder.Desc
      });

      const fetched = (data?.getLikedPosts ?? []) as GetLikedPostsOutput[];
      setHasMore(fetched.length === input.take);

      if (initial) setPostLikes(fetched);
      else setPostLikes([...postLikes, ...fetched]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fan) loadLikes(true);
  }, [fan]); // eslint-disable-line

  const loadMore = () => {
    if (!loading && hasMore) loadLikes(false);
  };

  return {
    postLikes: fan ? postLikes : [],
    loading: fan ? loading : false,
    hasMore: fan ? hasMore : false,
    loadMore
  };
};
