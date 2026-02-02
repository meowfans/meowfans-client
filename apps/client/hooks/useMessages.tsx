'use client';

import { useMessagesActions } from '@workspace/gql/actions';
import {
  ChannelsOutput,
  DeleteMessageInput,
  DeleteMessagesInput,
  MessagesOutput,
  PaginationInput,
  SendMessageFromFanInput,
  UpdateMessageInput
} from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useEffect, useState } from 'react';
import { useFan } from './context/UserContextWrapper';
import { useChannelsStore } from './store/channels.store';

export const useChannelMessages = (input: PaginationInput) => {
  const { fan } = useFan();
  const { errorHandler } = useErrorHandler();
  const { channel, setChannel } = useChannelsStore();
  const { getSingleChannelQuery } = useMessagesActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadMessages = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : channel.messages.length;
    setLoading(channel.messages?.length === 0);

    try {
      const { data } = await getSingleChannelQuery({ ...input, skip });
      const fetchedChannel = data?.getSingleChannel as ChannelsOutput;
      const fetchedMessages = (fetchedChannel.messages as MessagesOutput[]) ?? [];

      const take = input.take ?? fetchedMessages.length;
      setHasMore(fetchedMessages.length === take);

      setChannel((prev) =>
        initialLoad
          ? { ...fetchedChannel, messages: fetchedMessages }
          : { ...fetchedChannel, messages: [...prev?.messages, ...fetchedMessages] }
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
    setChannel({} as ChannelsOutput);
    loadMessages(true);
  };

  useEffect(() => {
    if (fan) loadMessages(true);
  }, [input.relatedEntityId, input.take]); //eslint-disable-line

  if (!fan)
    return {
      loading: false,
      hasMore: false,
      handleLoadMore: () => null,
      channel: {} as ChannelsOutput
    };

  return { channel, loading, hasMore, handleLoadMore, handleRefresh };
};

export const useMessageMutations = () => {
  const { setChannel, setChannels } = useChannelsStore();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const { updateMessageMutation, deleteMessageMutation, deleteMessagesMutation, sendReplyFromFanMutation, sendMessageFromFanMutation } =
    useMessagesActions();
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (input: SendMessageFromFanInput) => {
    setLoading(true);
    try {
      const { data } = await sendMessageFromFanMutation(input);
      const newMessage = data?.sendMessageFromFan as MessagesOutput;
      if (newMessage) {
        setChannel((prev) => ({ ...prev, messages: [newMessage, ...prev.messages] }));
        setChannels((prev) =>
          prev.map((channel) => (channel.id === newMessage.channelId ? { ...channel, lastMessage: newMessage } : channel))
        );
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
        setChannel((prev) => ({ ...prev, messages: prev.messages.filter((m) => !input.messageIds.includes(m.id)) }));
        successHandler({ message: 'Deleted messages' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const sendReply = async (input: SendMessageFromFanInput) => {
    setLoading(true);
    try {
      const { data } = await sendReplyFromFanMutation(input);
      const newMessage = data?.sendReplyFromFan as MessagesOutput;
      if (newMessage) {
        setChannel((prev) => ({ ...prev, messages: [newMessage, ...prev.messages] }));
        setChannels((prev) =>
          prev.map((channel) => (channel.id === newMessage.channelId ? { ...channel, lastMessage: newMessage } : channel))
        );
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
      const updated = data?.updateMessage as MessagesOutput;
      if (updated) {
        setChannel((prev) => ({ ...prev, messages: prev.messages.map((m) => (m.id === updated.id ? { ...m, ...updated } : m)) }));
        setChannels((prev) => prev.map((channel) => (channel.id === updated.channelId ? { ...channel, lastMessage: updated } : channel)));
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
        setChannel((prev) => ({ ...prev, messages: prev.messages.filter((m) => m.id !== input.messageId) }));
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
