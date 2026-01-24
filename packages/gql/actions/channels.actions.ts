'use client';

import { useLazyQuery, useMutation } from '@apollo/client/react';
import { CREATE_CHANNEL_MUTATION, GET_CHANNEL_QUERY, GET_CHANNELS_QUERY, UPDATE_CHANNEL_MUTATION } from '../api';
import { CreateChannelInput, GetChannelInput, PaginationInput, UpdateChannelInput } from '../generated/graphql';

export const useChannelsActions = () => {
  const [createChannel] = useMutation(CREATE_CHANNEL_MUTATION);
  const [updateChannel] = useMutation(UPDATE_CHANNEL_MUTATION);
  const [getChannels] = useLazyQuery(GET_CHANNELS_QUERY);
  const [getChannel] = useLazyQuery(GET_CHANNEL_QUERY);

  const getChannelQuery = (input: GetChannelInput) => {
    return getChannel({ variables: { input } });
  };

  const getChannelsQuery = (input: PaginationInput) => {
    return getChannels({ variables: { input } });
  };

  const createChannelMutation = (input: CreateChannelInput) => {
    return createChannel({ variables: { input } });
  };

  const updateChannelMutation = (input: UpdateChannelInput) => {
    return updateChannel({ variables: { input } });
  };

  return {
    getChannelQuery,
    getChannelsQuery,
    createChannelMutation,
    updateChannelMutation
  };
};
