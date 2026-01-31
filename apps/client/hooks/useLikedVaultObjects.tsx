import { useFan } from '@/hooks/context/UserContextWrapper';
import { useLikesStore } from '@/hooks/store/likes.store';
import { useLikesActions } from '@workspace/gql/actions/likes.actions';
import { GetLikedVaultObjectsOutput, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useLikedVaultObjects = () => {
  const { fan } = useFan();
  const { getLikedVaultObjectsQuery } = useLikesActions();
  const { vaultObjectLikes, setVaultObjectLikes, appendVaultObjectLikes } = useLikesStore();
  const { errorHandler } = useErrorHandler();

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const loadLikes = async (initial = false) => {
    const skip = initial ? 0 : vaultObjectLikes.length;
    setLoading(vaultObjectLikes.length === 0);

    try {
      const { data } = await getLikedVaultObjectsQuery({
        take: 30,
        skip,
        orderBy: SortOrder.Desc
      });

      const fetched = (data?.getLikedVaultObjects ?? []) as GetLikedVaultObjectsOutput[];
      setHasMore(fetched.length === 30);

      if (initial) setVaultObjectLikes(fetched);
      else appendVaultObjectLikes(fetched);
    } catch (e) {
      errorHandler({ error: e });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) loadLikes(false);
  };

  useEffect(() => {
    if (fan) loadLikes(true);
  }, [fan]); // eslint-disable-line

  return {
    vaultObjectLikes: fan ? vaultObjectLikes : [],
    loading: fan ? loading : false,
    hasMore: fan ? hasMore : false,
    loadMore
  };
};
