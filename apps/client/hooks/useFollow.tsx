import { useFollowingStore } from '@/hooks/store/follows.store';
import { useCreatorsStore } from '@/hooks/store/users.store';
import { useFollowsActions } from '@workspace/gql/actions/follows.actions';
import { GetFollowingOutput, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useEffect, useState } from 'react';
import { useFan } from './context/UserContextWrapper';

export const useFollowings = () => {
  const { fan } = useFan();
  const { errorHandler } = useErrorHandler();
  const { followings, setFollowings } = useFollowingStore();
  const { getFanFollowingsQuery } = useFollowsActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const LIMIT = 30;

  const loadFollowings = async (initialLoad = false) => {
    if (!fan) return;

    const skip = initialLoad ? 0 : followings.length;
    setLoading(followings.length === 0);

    try {
      const { data } = await getFanFollowingsQuery({ skip, take: LIMIT, orderBy: SortOrder.Desc });
      const fetchedFollowings = data?.getFollowing as GetFollowingOutput[];

      setHasMore(fetchedFollowings.length === LIMIT);
      if (initialLoad) setFollowings(fetchedFollowings);
      else setFollowings([...followings, ...fetchedFollowings]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) loadFollowings();
  };

  const refresh = () => loadFollowings(true);

  useEffect(() => {
    if (fan) loadFollowings(true);
  }, [fan]); //eslint-disable-line

  return {
    followings,
    loading,
    hasMore,
    loadMore,
    refresh
  };
};

export const useFollowingMutations = () => {
  const { successHandler } = useSuccessHandler();
  const { errorHandler } = useErrorHandler();
  const { creators, setCreators } = useCreatorsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const { followings, setFollowings } = useFollowingStore();
  const { followCreatorMutation, unFollowCreatorMutation } = useFollowsActions();

  const followCreator = async (creatorId: string) => {
    if (!creatorId) return;
    setLoading(true);
    try {
      const { data } = await followCreatorMutation({ creatorId });
      const newFollowedCreator = data?.followCreator?.creatorProfile?.user as GetFollowingOutput;

      setFollowings([...followings, newFollowedCreator]);
      setCreators(creators.map((c) => (c.id === creatorId ? { ...c, creatorProfile: { ...c, isFollowing: true } } : c)));

      successHandler({ message: 'You have followed a new creator 😄' });
      return true;
    } catch (error) {
      errorHandler({ error, msg: 'Unable to follow creator!' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const unfollowCreator = async (creatorId: string) => {
    if (!creatorId) return;
    setLoading(true);
    try {
      await unFollowCreatorMutation({ creatorId });

      setFollowings(followings.filter((f) => f.id !== creatorId));
      setCreators(creators.map((c) => (c.id === creatorId ? { ...c, creatorProfile: { ...c, isFollowing: false } } : c)));

      successHandler({ message: 'Successfully unfollowed!' });
      return true;
    } catch (error) {
      errorHandler({ error, msg: 'Unable to unfollow creator!' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    followCreator,
    loading,
    unfollowCreator
  };
};
