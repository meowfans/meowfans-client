'use client';

import { useLazyQuery, useMutation } from '@apollo/client/react';
import { CREATE_CHANNEL_MUTATION, GET_CHANNELS_QUERY, UPDATE_CHANNEL_MUTATION, UPDATE_CHANNEL_STATUS_MUTATION } from '../api';
import { AcceptChannelRequestInput, CreateChannelInput, PaginationInput, UpdateChannelInput } from '../generated/graphql';

export const useChannelsActions = () => {
  const [createChannel] = useMutation(CREATE_CHANNEL_MUTATION);
  const [updateChannel] = useMutation(UPDATE_CHANNEL_MUTATION);
  const [updateChannelStatus] = useMutation(UPDATE_CHANNEL_STATUS_MUTATION);
  const [getChannels] = useLazyQuery(GET_CHANNELS_QUERY);

  const getChannelsQuery = (input: PaginationInput) => {
    return getChannels({ variables: { input } });
  };

  const updateChannelStatusMutation = (input: AcceptChannelRequestInput) => {
    return updateChannelStatus({ variables: { input } });
  };

  const createChannelMutation = (input: CreateChannelInput) => {
    return createChannel({ variables: { input } });
  };

  const updateChannelMutation = (input: UpdateChannelInput) => {
    return updateChannel({ variables: { input } });
  };

  return {
    getChannelsQuery,
    createChannelMutation,
    updateChannelMutation,
    updateChannelStatusMutation
  };
};
