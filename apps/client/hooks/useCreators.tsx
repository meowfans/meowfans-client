import { useCreatorsStore } from '@/hooks/store/users.store';
import { useCreatorsActions } from '@workspace/gql/actions/creators.actions';
import { CreatorType, DataFetchType, SortBy, SortOrder, UsersEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

interface UseCreatorsProps {
  sortBy?: SortBy;
  take?: number;
  orderBy?: SortOrder;
}

export const useCreators = ({ sortBy = SortBy.UserCreatedAt, take = 40, orderBy = SortOrder.Desc }: UseCreatorsProps) => {
  const { publicGetDefaultCreatorsQuery } = useCreatorsActions();
  const { errorHandler } = useErrorHandler();
  const { creators, setCreators } = useCreatorsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadCreators = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : creators.length;
    setLoading(creators.length === 0);
    try {
      const { data } = await publicGetDefaultCreatorsQuery({
        take,
        skip,
        sortBy,
        orderBy,
        creatorType: Object.values(CreatorType),
        dataFetchType: DataFetchType.InfiniteScroll
      });

      const fetchedCreators = (data?.getDefaultCreators.creators ?? []) as UsersEntity[];

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
    loadCreators(true);
  }, [sortBy, orderBy]);

  return { creators, loading, hasMore, loadMore, refresh };
};
