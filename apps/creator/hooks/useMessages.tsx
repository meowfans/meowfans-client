'use client';

import { useMessagesActions } from '@workspace/gql/actions';
import {
  DeleteMessageInput,
  DeleteMessagesInput,
  MessageChannelsEntity,
  MessagesEntity,
  PaginationInput,
  SendMessageFromCreatorInput,
  UpdateMessageInput
} from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useEffect, useState } from 'react';
import { useChannelsStore } from './store/channels.store';

export const useChannelMessages = (input: PaginationInput) => {
  const { channel, setChannel } = useChannelsStore();
  const { errorHandler } = useErrorHandler();
  const { getChannelMessagesQuery } = useMessagesActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadMessages = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : channel.messages.length;
    setLoading(channel.messages?.length === 0);

    try {
      const { data } = await getChannelMessagesQuery({ ...input, skip });
      const fetchedChannel = data?.getChannelMessages as MessageChannelsEntity;
      const fetchedMessages = fetchedChannel.messages ?? [];

      const take = input.take ?? fetchedMessages.length;
      setHasMore(fetchedMessages.length === take);

      setChannel(
        initialLoad
          ? { ...fetchedChannel, messages: fetchedMessages }
          : { ...fetchedChannel, messages: [...channel.messages, ...fetchedMessages] }
      );
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) loadMessages();
  };

  const handleRefresh = () => {
    setChannel({} as MessageChannelsEntity);
    loadMessages(true);
  };

  useEffect(() => {
    loadMessages(true);
  }, [input.relatedEntityId, input.take]); //eslint-disable-line

  return { channel, loading, hasMore, handleLoadMore, handleRefresh };
};

export const useMessageMutations = () => {
  const { channel, setChannel } = useChannelsStore();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const {
    sendMessageFromCreatorMutation,
    sendReplyFromCreatorMutation,
    updateMessageMutation,
    deleteMessageMutation,
    deleteMessagesMutation
  } = useMessagesActions();
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (input: SendMessageFromCreatorInput) => {
    setLoading(true);
    try {
      const { data } = await sendMessageFromCreatorMutation(input);
      const newMessage = data?.sendMessageFromCreator as MessagesEntity;
      if (newMessage) {
        setChannel({ ...channel, messages: [...channel.messages, newMessage] });
        successHandler({ message: 'Message sent' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const deleteMessages = async (input: DeleteMessagesInput) => {
    setLoading(true);
    try {
      const { data } = await deleteMessagesMutation(input);
      const deleted = data?.deleteMessages;

      if (deleted) {
        setChannel({ ...channel, messages: channel.messages.filter((m) => !input.messageIds.includes(m.id)) });
        successHandler({ message: 'Deleted messages' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const sendReply = async (input: SendMessageFromCreatorInput) => {
    setLoading(true);
    try {
      const { data } = await sendReplyFromCreatorMutation(input);
      const newMessage = data?.sendReplyFromCreator as MessagesEntity;
      if (newMessage) {
        setChannel({ ...channel, messages: [...channel.messages, newMessage] });
        successHandler({ message: 'Reply sent' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const updateMessage = async (input: UpdateMessageInput) => {
    setLoading(true);
    try {
      const { data } = await updateMessageMutation(input);
      const updated = data?.updateMessage as MessagesEntity;
      if (updated) {
        setChannel({ ...channel, messages: channel.messages.map((m) => (m.id === updated.id ? { ...m, ...updated } : m)) });
        successHandler({ message: 'Message updated' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (input: DeleteMessageInput) => {
    setLoading(true);
    try {
      const { data } = await deleteMessageMutation(input);
      if (data?.deleteMessage) {
        setChannel({ ...channel, messages: channel.messages.filter((m) => m.id !== input.messageId) });
        successHandler({ message: 'Message deleted' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage, sendReply, updateMessage, deleteMessage, deleteMessages };
};
