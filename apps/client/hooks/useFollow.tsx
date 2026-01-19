import { useFollowingStore } from '@/hooks/store/follows.store';
import { useCreatorsStore } from '@/hooks/store/users.store';
import { useFollowsActions } from '@workspace/gql/actions/follows.actions';
import { CreatorFollowsEntity, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useFan } from './context/UserContextWrapper';

export const useFollowings = () => {
  const { fan } = useFan();
  const { errorHandler } = useErrorHandler();
  const { creators, setCreators } = useCreatorsStore();
  const { followings, setFollowings } = useFollowingStore();
  const { followCreatorMutation, getFanFollowingsQuery, unFollowCreatorMutation } = useFollowsActions();
  const LIMIT = 30;

  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadFollowings = async (initialLoad = false) => {
    if (!fan) return;

    const skip = initialLoad ? 0 : followings.length;
    setLoading(followings.length === 0);

    try {
      const { data } = await getFanFollowingsQuery({ skip, take: LIMIT, orderBy: SortOrder.Desc });
      const fetchedFollowings = data?.getFollowing as CreatorFollowsEntity[];

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

  const followCreator = async (creatorId: string) => {
    if (!creatorId) return;
    try {
      const { data } = await followCreatorMutation({ creatorId });
      const newFollowedCreator = data?.followCreator as CreatorFollowsEntity;
      setFollowings([...followings, newFollowedCreator]);
      setCreators(creators.map((c) => (c.id === creatorId ? { ...c, creatorProfile: { ...c.creatorProfile, isFollowing: true } } : c)));
      toast.success('You have followed a new creator 😄');
      return true;
    } catch (error) {
      errorHandler({ error, msg: 'Unable to follow creator!' });
      return false;
    }
  };

  const unfollowCreator = async (creatorId: string) => {
    if (!creatorId) return;
    try {
      await unFollowCreatorMutation({ creatorId });
      setFollowings(followings.filter((f) => f.creatorId !== creatorId));
      setCreators(creators.map((c) => (c.id === creatorId ? { ...c, creatorProfile: { ...c.creatorProfile, isFollowing: false } } : c)));
      toast.success('Successfully unfollowed!');
      return true;
    } catch (error) {
      errorHandler({ error, msg: 'Unable to unfollow creator!' });
      return false;
    }
  };

  return {
    followings,
    loading,
    hasMore,
    loadMore,
    refresh,
    followCreator,
    unfollowCreator
  };
};
