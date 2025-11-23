import { useTagsStore } from '@/hooks/store/tags.store';
import { SortOrder } from '@workspace/gql/generated/graphql';
import { useEffect, useState } from 'react';
import { useTagsActions } from './api/tags.actions';
import { useErrorHandler } from './useErrorHandler';

export const useTags = () => {
  const { getTagsQuery, getSearchedTagsQuery } = useTagsActions();
  const { tags, setTags } = useTagsStore();
  const { errorHandler } = useErrorHandler();

  const getTags = () => {
    const LIMIT = 300;
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const loadTags = async (initialLoad = false) => {
      const offset = initialLoad ? 0 : tags.length;
      try {
        const { data } = await getTagsQuery({
          limit: LIMIT,
          orderBy: SortOrder.Asc,
          offset
        });

        const fetchedTags = data?.getPublicTags ?? [];
        setHasMore(fetchedTags.length === LIMIT);

        if (initialLoad) setTags(fetchedTags);
        else setTags([...tags, ...fetchedTags]);
      } catch (error) {
        errorHandler({ error });
      } finally {
        setLoading(false);
      }
    };

    const handleLoadMore = () => {
      if (hasMore && !loading) loadTags();
    };

    const handleRefresh = async () => {
      setTags([]);
      loadTags(true);
    };

    useEffect(() => {
      loadTags(true);
    }, []);

    return { tags, handleLoadMore, hasMore, loading, onRefresh: handleRefresh };
  };

  const getSearchedTags = async (searchTerm: string, take = 5) => {
    try {
      const { data } = await getSearchedTagsQuery({ searchTerm, take });
      return data?.searchTags.map((tag) => tag.label) || [];
    } catch (error) {
      errorHandler({ error });
      return [];
    }
  };

  return { getTags, getSearchedTags };
};
