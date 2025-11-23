import { useCreatorsStore } from '@/hooks/store/users.store';
import { CreatorType, DataFetchType, ExtendedUsersEntity, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { useCreatorsActions } from './api/creators.actions';
import { useErrorHandler } from './useErrorHandler';

interface Props {
  sortBy?: SortBy;
  take?: number;
  fanId?: string;
  orderBy?: SortOrder;
}

export const useCreators = () => {
  const { publicGetAllCreatorsQuery } = useCreatorsActions();
  const { errorHandler } = useErrorHandler();
  const { creators, setCreators } = useCreatorsStore();

  const getCreators = ({ sortBy = SortBy.UserCreatedAt, take = 40, fanId, orderBy = SortOrder.Desc }: Props) => {
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const loadCreators = async (initialLoad = false) => {
      const skip = initialLoad ? 0 : creators.length;
      try {
        const { data } = await publicGetAllCreatorsQuery({
          take,
          skip,
          dataFetchType: DataFetchType.InfiniteScroll,
          sortBy,
          relatedUserId: fanId,
          orderBy,
          creatorType: Object.values(CreatorType)
        });
        const fetchedCreators = (data?.getDefaultCreators.creators ?? []) as ExtendedUsersEntity[];
        setHasMore(fetchedCreators.length === take);

        if (initialLoad) setCreators(fetchedCreators);
        else setCreators([...creators, ...fetchedCreators]);
        setLoading(false);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (!loading && hasMore) loadCreators();
    };

    const handleRefresh = async () => {
      setCreators([]);
      loadCreators(true);
    };

    useEffect(() => {
      loadCreators(true);
    }, []);

    return { creators, loading, hasMore, handleLoadMore, onRefresh: handleRefresh };
  };
  return { getCreators };
};
