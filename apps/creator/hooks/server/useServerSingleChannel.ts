'use client';

import { getSingleChannel } from '@/app/server/getSingleChannel';
import { useChannelsStore } from '@/hooks/store/channels.store';
import { ChannelsOutput, MessagesOutput, PaginationInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerSingleChannel = (params: PaginationInput, initialChannel: ChannelsOutput | null) => {
  const { errorHandler } = useErrorHandler();
  const { channel, setChannel } = useChannelsStore();
  const [loading, setLoading] = useState<boolean>(!initialChannel);
  const [hasMore, setHasMore] = useState<boolean>(initialChannel?.messages?.length === (params.take ?? 20));
  const [skip, setSkip] = useState<number>(initialChannel?.messages?.length ?? 0);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const fetched = await getSingleChannel({
        ...params,
        skip,
        take: params.take ?? 20
      });

      const fetchedChannel = fetched as ChannelsOutput;
      const fetchedMessages = (fetchedChannel?.messages ?? []) as MessagesOutput[];

      setHasMore(fetchedMessages.length === (params.take ?? 20));
      setChannel((prev) => ({
        ...fetchedChannel,
        messages: prev?.messages ? [...prev.messages, ...fetchedMessages] : fetchedMessages
      }));
      setSkip((prev) => prev + (params.take ?? 20));
    } catch (error) {
      errorHandler({ error, msg: 'Error loading messages! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialChannel) {
      setChannel(initialChannel);
      setSkip(initialChannel.messages?.length ?? 0);
    }
  }, [initialChannel, setChannel]);

  return {
    channel,
    loading,
    hasMore,
    loadMore,
    handleLoadMore: loadMore,
    refresh: () => {
      setChannel({} as ChannelsOutput);
      loadMore();
    }
  };
};
