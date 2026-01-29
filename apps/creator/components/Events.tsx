'use client';

import { useChannelsStore } from '@/hooks/store/channels.store';
import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { EventTypes } from '@workspace/ui/lib';
import { useEffect } from 'react';

export const Events = () => {
  const { setChannel, setChannels } = useChannelsStore();

  const onSendMessageFromFan = async (event: CustomEvent) => {
    const { data } = event.detail;
    const newMessage = data.newMessage;
    setChannel((prev) => {
      const prevMessages = prev?.messages ?? [];
      return { ...prev, messages: [newMessage, ...prevMessages] };
    });
  };

  const onSeenMessage = async (event: CustomEvent) => {
    const { seenAt, senderId, channelId } = event.detail.data;

    setChannel((prev) => {
      const prevParticipants = prev?.participants ?? [];
      return {
        ...prev,
        participants: prevParticipants?.map((p) => (p.userId === senderId ? { ...p, lastSeenAt: seenAt } : p))
      };
    });

    setChannels((prev) =>
      prev?.map((channel) => {
        const prevParticipants = channel?.participants ?? [];
        return {
          ...channel,
          participants: prevParticipants?.map((participant) =>
            participant?.messageChannelId === channelId && participant?.userId === senderId
              ? { ...participant, lastSeenAt: seenAt }
              : participant
          )
        };
      })
    );
  };

  const onUpdateChannelLastMessage = async (event: CustomEvent) => {
    const { data } = event.detail;
    const lastMessage = data.lastMessage;
    setChannels((prev) =>
      prev?.map((channel) => ({
        ...channel,
        lastMessage: channel.id === lastMessage?.channelId ? lastMessage : channel?.lastMessage
      }))
    );
  };

  const onUpdateMessage = async (event: CustomEvent) => {
    const { data } = event.detail;
    const updatedMessage = data.updatedMessage;
    setChannel((prev) => {
      const prevMessages = prev?.messages ?? [];
      return { ...prev, messages: prevMessages?.map((m) => (m.id === updatedMessage.id ? { ...m, ...updatedMessage } : m)) };
    });
  };

  const onDeleteMessage = async (event: CustomEvent) => {
    const { data } = event.detail;
    const deleteMessageId = data.deletableId;
    setChannel((prev) => {
      const prevMessages = prev?.messages ?? [];
      return { ...prev, messages: prevMessages?.filter((m) => m.id !== deleteMessageId) };
    });
  };

  const onDeleteMessages = async (event: CustomEvent) => {
    const { data } = event.detail;
    const deletableIds = data.deletableIds;
    setChannel((prev) => {
      const prevMessages = prev?.messages ?? [];
      return { ...prev, messages: prevMessages?.filter((m) => !deletableIds.includes(m.id)) };
    });
  };

  useEffect(() => {
    const sendHandler = (e: Event) => onSendMessageFromFan(e as CustomEvent);
    const updateHandler = (e: Event) => onUpdateMessage(e as CustomEvent);
    const deleteHandler = (e: Event) => onDeleteMessage(e as CustomEvent);
    const deleteManyHandler = (e: Event) => onDeleteMessages(e as CustomEvent);
    const onSeenMessageHandler = (e: Event) => onSeenMessage(e as CustomEvent);
    const onUpdateChannelLastMessageHandler = (e: Event) => onUpdateChannelLastMessage(e as CustomEvent);

    eventEmitter.addEventListener(EventTypes.SendMessageFromFan, sendHandler);
    eventEmitter.addEventListener(EventTypes.UpdateMessage, updateHandler);
    eventEmitter.addEventListener(EventTypes.DeleteMessage, deleteHandler);
    eventEmitter.addEventListener(EventTypes.DeleteMessages, deleteManyHandler);
    eventEmitter.addEventListener(EventTypes.MessageSeen, onSeenMessageHandler);
    eventEmitter.addEventListener(EventTypes.LastMessage, onUpdateChannelLastMessageHandler);

    return () => {
      eventEmitter.removeEventListener(EventTypes.SendMessageFromFan, sendHandler);
      eventEmitter.removeEventListener(EventTypes.UpdateMessage, updateHandler);
      eventEmitter.removeEventListener(EventTypes.DeleteMessage, deleteHandler);
      eventEmitter.removeEventListener(EventTypes.DeleteMessages, deleteManyHandler);
      eventEmitter.removeEventListener(EventTypes.MessageSeen, onSeenMessageHandler);
      eventEmitter.removeEventListener(EventTypes.LastMessage, onUpdateChannelLastMessageHandler);
    };
  }, []); // eslint-disable-line

  return null;
};
