'use client';

import { useLazyQuery, useMutation } from '@apollo/client/react';
import {
  DELETE_MESSAGE_MUTATION,
  DELETE_MESSAGES_MUTATION,
  GET_CHANNEL_MESSAGES_QUERY,
  SEND_MESSAGE_FROM_CREATOR_MUTATION,
  SEND_MESSAGE_FROM_FAN_MUTATION,
  SEND_REPLY_FROM_CREATOR_MUTATION,
  SEND_REPLY_FROM_FAN_MUTATION,
  UPDATE_MESSAGE_MUTATION
} from '../api/messagesAPI';
import {
  DeleteMessageInput,
  DeleteMessagesInput,
  PaginationInput,
  SendMessageFromCreatorInput,
  SendMessageFromFanInput,
  UpdateMessageInput
} from '../generated/graphql';

export const useMessagesActions = () => {
  const [getChannelMessages] = useLazyQuery(GET_CHANNEL_MESSAGES_QUERY);
  const [sendMessageFromCreator] = useMutation(SEND_MESSAGE_FROM_CREATOR_MUTATION);
  const [sendMessageFromFan] = useMutation(SEND_MESSAGE_FROM_FAN_MUTATION);
  const [sendReplyFromCreator] = useMutation(SEND_REPLY_FROM_CREATOR_MUTATION);
  const [sendReplyFromFan] = useMutation(SEND_REPLY_FROM_FAN_MUTATION);
  const [updateMessage] = useMutation(UPDATE_MESSAGE_MUTATION);
  const [deleteMessage] = useMutation(DELETE_MESSAGE_MUTATION);
  const [deleteMessages] = useMutation(DELETE_MESSAGES_MUTATION);

  const getChannelMessagesQuery = (input: PaginationInput) => {
    return getChannelMessages({ variables: { input } });
  };

  const sendMessageFromCreatorMutation = (input: SendMessageFromCreatorInput) => {
    return sendMessageFromCreator({ variables: { input } });
  };

  const sendMessageFromFanMutation = (input: SendMessageFromFanInput) => {
    return sendMessageFromFan({ variables: { input } });
  };

  const sendReplyFromCreatorMutation = (input: SendMessageFromCreatorInput) => {
    return sendReplyFromCreator({ variables: { input } });
  };

  const sendReplyFromFanMutation = (input: SendMessageFromFanInput) => {
    return sendReplyFromFan({ variables: { input } });
  };

  const updateMessageMutation = (input: UpdateMessageInput) => {
    return updateMessage({ variables: { input } });
  };

  const deleteMessageMutation = (input: DeleteMessageInput) => {
    return deleteMessage({ variables: { input } });
  };

  const deleteMessagesMutation = (input: DeleteMessagesInput) => {
    return deleteMessages({ variables: { input } });
  };

  return {
    getChannelMessagesQuery,
    sendMessageFromCreatorMutation,
    sendMessageFromFanMutation,
    sendReplyFromCreatorMutation,
    sendReplyFromFanMutation,
    updateMessageMutation,
    deleteMessageMutation,
    deleteMessagesMutation
  };
};
