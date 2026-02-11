import { useCreatorsActions } from '@workspace/gql/actions/creators.actions';
import { CreatorType, DataFetchType, GetDefaultCreatorsOutput, PaginationInput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';
import { useCreatorsStore } from '../store/users.store';

export const useCreators = ({
  sortBy = SortBy.UserCreatedAt,
  take = 40,
  orderBy = SortOrder.Desc,
  enabled = true,
  ...params
}: PaginationInput & { enabled?: boolean }) => {
  const { errorHandler } = useErrorHandler();
  const { creators, setCreators } = useCreatorsStore();
  const [loading, setLoading] = useState<boolean>(enabled);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { publicGetDefaultCreatorsQuery } = useCreatorsActions();

  const loadCreators = async (initialLoad = false) => {
    if (!enabled) return;
    const skip = initialLoad ? 0 : creators.length;
    setLoading(creators.length === 0);
    try {
      const { data } = await publicGetDefaultCreatorsQuery({
        take,
        skip,
        sortBy,
        orderBy,
        ...params,
        creatorType: Object.values(CreatorType),
        dataFetchType: DataFetchType.InfiniteScroll
      });

      const fetchedCreators = (data?.getDefaultCreators ?? []) as GetDefaultCreatorsOutput[];

      setHasMore(fetchedCreators.length === take);

      if (initialLoad) setCreators(fetchedCreators);
      else setCreators([...creators, ...fetchedCreators]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) loadCreators();
  };

  const refresh = () => {
    setCreators([]);
    loadCreators(true);
  };

  useEffect(() => {
    if (enabled) {
      loadCreators(true);
    }
  }, [sortBy, orderBy, enabled, params.searchTerm]); //eslint-disable-line

  return { creators, loading, hasMore, loadMore, refresh, isEmpty: creators.length === 0 };
};
