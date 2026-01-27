'use client';

import { useChannelsActions } from '@workspace/gql/actions';
import { GetChannelInput, MessageChannelsEntity, PaginationInput, UpdateChannelInput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useEffect, useState } from 'react';
import { useFan } from './context/UserContextWrapper';
import { useChannelsStore } from './store/channels.store';

export const useChannels = (input: PaginationInput) => {
  const { fan } = useFan();
  const { channels, setChannels } = useChannelsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { errorHandler } = useErrorHandler();
  const { getChannelsQuery } = useChannelsActions();

  const loadChannels = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : channels.length;
    setLoading(channels.length === 0);
    try {
      const { data } = await getChannelsQuery({ ...input, skip });
      const fetchedChannels = data?.getChannels as MessageChannelsEntity[];

      setHasMore(fetchedChannels.length === input.take);
      setChannels(initialLoad ? fetchedChannels : [...channels, ...fetchedChannels]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadChannels();
  };

  useEffect(() => {
    if (fan) loadChannels(true);
  }, [input.take]); //eslint-disable-line

  if (!fan)
    return {
      loading: false,
      hasMore: false,
      handleLoadMore: () => null,
      channels: []
    };

  return {
    loading,
    hasMore,
    handleLoadMore,
    channels
  };
};

export const useUpdateChannel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { errorHandler } = useErrorHandler();
  const { updateChannelMutation } = useChannelsActions();
  const { successHandler } = useSuccessHandler();
  const { channels, setChannels, setChannel } = useChannelsStore();

  const updateChannel = async (input: UpdateChannelInput) => {
    setLoading(true);
    try {
      const { data } = await updateChannelMutation(input);
      const updatedChannel = data?.updateChannel as MessageChannelsEntity;
      if (!updatedChannel) return;

      setChannels(channels.map((c) => (c.id === updatedChannel.id ? { ...c, ...updatedChannel } : c)));
      setChannel(updatedChannel);
      successHandler({ message: 'Channel updated successfully' });
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateChannel };
};

export const useSingleChannel = (input: GetChannelInput) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { errorHandler } = useErrorHandler();
  const { getChannelQuery } = useChannelsActions();
  const { setChannel, channel } = useChannelsStore();

  const loadChannel = async () => {
    setLoading(true);
    try {
      const { data } = await getChannelQuery(input);
      const fetchedChannel = data?.getChannel as MessageChannelsEntity;

      setChannel(fetchedChannel);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChannel();
  }, [input.channelId]); //eslint-disable-line

  return {
    loading,
    channel
  };
};
