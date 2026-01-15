import { useFollowsActions } from '@workspace/gql/actions';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useFollowerStore } from './store/followers.store';
import { CreatorFollowsEntity, PaginationInput } from '@workspace/gql/generated/graphql';

export const useFollowers = (input: PaginationInput) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { errorHandler } = useErrorHandler();
  const { getFollowersQuery } = useFollowsActions();
  const { followers, setFollowers } = useFollowerStore();

  const loadFollowers = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : followers.length;
    setLoading(followers.length === 0);
    try {
      const { data } = await getFollowersQuery({ ...input, skip });
      const fetched = data?.getFollowers as CreatorFollowsEntity[];

      setHasMore(fetched.length === input.take);

      if (initialLoad) setFollowers(fetched);
      else setFollowers([...followers, ...fetched]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadFollowers();
  };

  useEffect(() => {
    loadFollowers(true);
  }, [input.take, input.skip, input.orderBy]);

  return { loading, hasMore, handleLoadMore, followers };
};
