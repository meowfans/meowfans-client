'use client';

import { useChannelsActions } from '@workspace/gql/actions';
import {
  AcceptChannelRequestInput,
  ChannelsOutput,
  MessageChannelStatus,
  PaginationInput,
  UpdateChannelInput
} from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useRouter } from 'next/navigation';
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
      const fetchedChannels = data?.getChannels as ChannelsOutput[];

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
    channels,
    isEmpty: channels.length === 0
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
      const updatedChannel = data?.updateChannel as ChannelsOutput;
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

export const useUpdateChannelStatus = () => {
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const { setChannel } = useChannelsStore();
  const { updateChannelStatusMutation } = useChannelsActions();
  const [loading, setLoading] = useState<boolean>(false);

  const updateChannelStatus = async (input: AcceptChannelRequestInput) => {
    setLoading(true);
    try {
      const { data } = await updateChannelStatusMutation(input);
      const status = data?.updateChannelStatus as MessageChannelStatus;
      if (status) {
        setChannel((prev) => ({ ...prev, status }));
        successHandler({ message: 'Permission changed', description: status });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { updateChannelStatus, loading };
};

export const useCreateChannel = () => {
  const { fan } = useFan();
  const router = useRouter();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const { createChannelMutation } = useChannelsActions();
  const [loading, setLoading] = useState<boolean>(false);

  const createChannel = async (creatorId: string) => {
    if (!fan || !creatorId) return;
    setLoading(true);
    try {
      const { data } = await createChannelMutation({ creatorId, fanId: fan.fanId });
      const channelId = data?.createChannel as string;

      if (channelId) {
        router.push(`/channels/${channelId}`);
        successHandler({ message: 'New channel created' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { createChannel, loading };
};
