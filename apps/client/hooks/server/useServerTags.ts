'use client';

import { getTags } from '@/app/server/getTags';
import { useTagsStore } from '@/hooks/store/tags.store';
import { SortOrder, TagsEntity } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

interface UseServerTagsProps {
  limit?: number;
}

export const useServerTags = ({ limit = 100 }: UseServerTagsProps, initialTags: TagsEntity[]) => {
  const { errorHandler } = useErrorHandler();
  const { tags, setTags } = useTagsStore();
  const [loading, setLoading] = useState<boolean>(initialTags.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialTags.length > 0 ? initialTags.length === limit : true);
  const [offset, setOffset] = useState<number>(initialTags.length);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getTags({
        take: limit,
        skip: offset,
        orderBy: SortOrder.Asc
      });
      const fetchedTags = (fetched ?? []) as TagsEntity[];

      setHasMore(fetchedTags.length === limit);
      setTags((prev) => [...prev, ...fetchedTags]);
      setOffset((prev) => prev + limit);
    } catch (error) {
      errorHandler({ error, msg: 'Error loading tags! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTags?.length > 0 && tags.length === 0) {
      setTags(initialTags);
      setOffset(initialTags.length);
    }
  }, [initialTags, setTags, tags.length]);

  return {
    tags,
    loading,
    hasMore,
    loadMore,
    isEmpty: tags.length === 0
  };
};
