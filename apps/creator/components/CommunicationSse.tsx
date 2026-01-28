'use client';

import { useChannelsStore } from '@/hooks/store/channels.store';
import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { EventTypes } from '@workspace/ui/lib';
import { useEffect } from 'react';

export const CommunicationSse = () => {
  const { setChannel } = useChannelsStore();

  const onSendMessageFromFan = async (event: CustomEvent) => {
    const { data } = event.detail;
    const newMessage = data.newMessage;
    setChannel((prev) => {
      return {
        ...prev,
        messages: [newMessage, ...prev.messages]
      };
    });
  };

  const onUpdateMessage = async (event: CustomEvent) => {
    const { data } = event.detail;
    const updatedMessage = data.updatedMessage;
    setChannel((prev) => {
      return { ...prev, messages: prev.messages.map((m) => (m.id === updatedMessage.id ? { ...m, ...updatedMessage } : m)) };
    });
  };

  const onDeleteMessage = async (event: CustomEvent) => {
    const { data } = event.detail;
    const deleteMessageId = data.deletableId;
    setChannel((prev) => {
      return { ...prev, messages: prev.messages.filter((m) => m.id !== deleteMessageId) };
    });
  };

  const onDeleteMessages = async (event: CustomEvent) => {
    const { data } = event.detail;
    const deletableIds = data.deletableIds;
    setChannel((prev) => {
      return { ...prev, messages: prev.messages.filter((m) => !deletableIds.includes(m.id)) };
    });
  };

  useEffect(() => {
    const sendHandler = (e: Event) => onSendMessageFromFan(e as CustomEvent);
    const updateHandler = (e: Event) => onUpdateMessage(e as CustomEvent);
    const deleteHandler = (e: Event) => onDeleteMessage(e as CustomEvent);
    const deleteManyHandler = (e: Event) => onDeleteMessages(e as CustomEvent);

    eventEmitter.addEventListener(EventTypes.SendMessageFromFan, sendHandler);
    eventEmitter.addEventListener(EventTypes.UpdateMessage, updateHandler);
    eventEmitter.addEventListener(EventTypes.DeleteMessage, deleteHandler);
    eventEmitter.addEventListener(EventTypes.DeleteMessages, deleteManyHandler);

    return () => {
      eventEmitter.removeEventListener(EventTypes.SendMessageFromFan, sendHandler);
      eventEmitter.removeEventListener(EventTypes.UpdateMessage, updateHandler);
      eventEmitter.removeEventListener(EventTypes.DeleteMessage, deleteHandler);
      eventEmitter.removeEventListener(EventTypes.DeleteMessages, deleteManyHandler);
    };
  }, []); // eslint-disable-line

  return null;
};
