'use client';

import { getChannels } from '@/app/server/getChannels';
import { useChannelsStore } from '@/hooks/store/channels.store';
import { ChannelsOutput, PaginationInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerChannels = (params: PaginationInput, initialChannels: ChannelsOutput[]) => {
  const { errorHandler } = useErrorHandler();
  const { channels, setChannels } = useChannelsStore();
  const [loading, setLoading] = useState<boolean>(initialChannels.length === 0);
  const [hasMore, setHasMore] = useState<boolean>(initialChannels.length === (params.take ?? 20));
  const [skip, setSkip] = useState<number>(params.take ?? 20);

  const loadMore = async () => {
    setLoading(true);
    try {
      const fetched = await getChannels({
        ...params,
        skip,
        take: params.take ?? 20
      });

      const fetchedChannels = (fetched ?? []) as ChannelsOutput[];
      setHasMore(fetchedChannels.length === (params.take ?? 20));
      setChannels((prev) => [...prev, ...fetchedChannels]);
      setSkip((prev) => prev + (params.take ?? 20));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading channels! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialChannels?.length > 0) {
      setChannels(initialChannels);
    }
  }, [initialChannels, setChannels]);

  return {
    channels,
    loading,
    hasMore,
    loadMore
  };
};
