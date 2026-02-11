import { useFan } from '@/hooks/context/UserContextWrapper';
import { useLikesStore } from '@/hooks/store/likes.store';
import { useLikesActions } from '@workspace/gql/actions/likes.actions';
import { GetLikedVaultsOutput, PaginationInput, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export function useLikedVaults(input: PaginationInput) {
  const { fan } = useFan();
  const { getLikedVaultsQuery } = useLikesActions();
  const { vaultLikes, setVaultLikes, appendVaultLikes } = useLikesStore();
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadLikes = async (initial = false) => {
    const skip = initial ? 0 : vaultLikes.length;
    setLoading(vaultLikes.length === 0);

    try {
      const { data } = await getLikedVaultsQuery({
        ...input,
        skip,
        orderBy: SortOrder.Desc
      });

      const fetched = (data?.getLikedVaults ?? []) as GetLikedVaultsOutput[];
      setHasMore(fetched.length === input.take);

      if (initial) setVaultLikes(fetched);
      else appendVaultLikes(fetched);
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
    vaultLikes: fan ? vaultLikes : [],
    loading: fan ? loading : false,
    hasMore: fan ? hasMore : false,
    loadMore
  };
}
