'use client';

import { useMessagesStore } from '@/hooks/store/message.store';
import { useMessagesActions } from '@workspace/gql/actions';
import {
  DeleteMessageInput,
  MessagesEntity,
  PaginationInput,
  SendMessageFromFanInput,
  UpdateMessageInput
} from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { useEffect, useState } from 'react';

export const useChannelMessages = (input: PaginationInput) => {
  const { messages, setMessages } = useMessagesStore();
  const { errorHandler } = useErrorHandler();
  const { getChannelMessagesQuery } = useMessagesActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadMessages = async (initialLoad = false) => {
    const skip = initialLoad ? 0 : messages.length;
    setLoading(messages.length === 0);

    try {
      const { data } = await getChannelMessagesQuery({ ...input, skip });
      const fetchedMessages = (data?.getChannelMessages ?? []) as MessagesEntity[];

      const take = input.take ?? fetchedMessages.length;
      setHasMore(fetchedMessages.length === take);

      setMessages(initialLoad ? fetchedMessages : [...messages, ...fetchedMessages]);
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
    setMessages([]);
    loadMessages(true);
  };

  useEffect(() => {
    loadMessages(true);
    // We care mainly about entity scope and page size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.relatedEntityId, input.take]);

  return { messages, loading, hasMore, handleLoadMore, handleRefresh };
};

export const useMessageMutations = () => {
  const { messages, setMessages } = useMessagesStore();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();
  const { sendMessageFromFanMutation, sendReplyFromFanMutation, updateMessageMutation, deleteMessageMutation } = useMessagesActions();
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (input: SendMessageFromFanInput) => {
    setLoading(true);
    try {
      const { data } = await sendMessageFromFanMutation(input);
      const newMessage = data?.sendMessageFromFan as MessagesEntity;
      if (newMessage) {
        setMessages([...messages, newMessage]);
        successHandler({ message: 'Message sent' });
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
      const newMessage = data?.sendReplyFromFan as MessagesEntity;
      if (newMessage) {
        setMessages([...messages, newMessage]);
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
        setMessages(messages.map((m) => (m.id === updated.id ? { ...m, ...updated } : m)));
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
        setMessages(messages.filter((m) => m.id !== input.messageId));
        successHandler({ message: 'Message deleted' });
      }
    } catch (error) {
      errorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage, sendReply, updateMessage, deleteMessage };
};
