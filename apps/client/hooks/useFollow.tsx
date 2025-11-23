import { useFollowingStore } from '@/hooks/store/follows.store';
import { useCreatorsStore } from '@/hooks/store/users.store';
import { CreatorFollowsEntity, SortOrder } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useFollowsActions } from './api/follows.actions';
import { useFan } from './context/UserContextWrapper';
import { useErrorHandler } from './useErrorHandler';

export const useFollows = () => {
  const { fan } = useFan();
  const { errorHandler } = useErrorHandler();
  const { creators, setCreators } = useCreatorsStore();
  const { followings, setFollowings } = useFollowingStore();
  const { followCreatorMutation, getFanFollowingsQuery, unFollowCreatorMutation } = useFollowsActions();

  const getFollowing = () => {
    const LIMIT = 30;
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const handleGetFollowing = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : followings.length;

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

    const handleLoadMore = () => {
      if (!loading && hasMore) handleGetFollowing();
    };

    useEffect(() => {
      if (fan) handleGetFollowing(true);
    }, [fan]);
    return {
      loading: !fan ? false : loading,
      hasMore: !fan ? false : hasMore,
      onLoadMore: handleLoadMore,
      followings: !fan ? [] : followings,
      setFollowings: setFollowings
    };
  };

  const creatorFollowHandler = async (creatorId: string) => {
    if (!creatorId.length) return;
    try {
      const { data } = await followCreatorMutation({ creatorId });
      const newFollowedCreator = data?.followCreator as CreatorFollowsEntity;
      setFollowings([...followings, newFollowedCreator]);
      setCreators(creators.map((c) => (c.id === creatorId ? { ...c, creatorProfile: { ...c.creatorProfile, isFollowing: true } } : c)));

      toast.success('You have followed a new creator 😄');
      return true;
    } catch (error) {
      errorHandler({ error, msg: 'Unable to follow creator!' });
    }
  };

  const creatorUnfollowHandler = async (creatorId: string) => {
    if (!creatorId.length) return;
    try {
      await unFollowCreatorMutation({ creatorId });
      setFollowings(followings.filter((following) => following.creatorId !== creatorId));
      setCreators(creators.map((c) => (c.id === creatorId ? { ...c, creatorProfile: { ...c.creatorProfile, isFollowing: false } } : c)));

      toast.success('Successfully unfollowed!');
      return true;
    } catch (error) {
      errorHandler({ error, msg: 'Unable to delete following creator' });
    }
  };

  return { creatorFollowHandler, creatorUnfollowHandler, getFollowing };
};
