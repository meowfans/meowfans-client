import { useTagsStore } from '@/hooks/store/tags.store';
import { useTagsActions } from '@workspace/gql/actions/tags.actions';
import { SortOrder } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

interface UseTagsProps {
  limit?: number;
}

export const useTags = ({ limit = 300 }: UseTagsProps) => {
  const { getPublicTagsQuery, getSearchedTagsQuery } = useTagsActions();
  const { tags, setTags } = useTagsStore();
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadTags = async (initialLoad = false) => {
    const offset = initialLoad ? 0 : tags.length;
    setLoading(tags.length === 0);

    try {
      const { data } = await getPublicTagsQuery({
        limit,
        orderBy: SortOrder.Asc,
        offset
      });

      const fetchedTags = data?.getPublicTags ?? [];
      setHasMore(fetchedTags.length === limit);

      if (initialLoad) setTags(fetchedTags);
      else setTags([...tags, ...fetchedTags]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadTags();
  };

  const handleRefresh = async () => {
    setTags([]);
    loadTags(true);
  };

  useEffect(() => {
    loadTags(true);
  }, [limit]);

  return { tags, loading, hasMore, loadTags, handleLoadMore, handleRefresh };
};

export const useSearchTags = () => {
  const { getSearchedTagsQuery } = useTagsActions();
  const { errorHandler } = useErrorHandler();

  const getSearchedTags = async (searchTerm: string, take = 5, clickedSearch: boolean) => {
    if (!clickedSearch) return [];
    try {
      const { data } = await getSearchedTagsQuery({ searchTerm, take });
      return data?.searchTags.map((tag) => tag.label) || [];
    } catch (error) {
      errorHandler({ error });
      return [];
    }
  };

  return { getSearchedTags };
};
