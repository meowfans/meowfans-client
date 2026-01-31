'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useChannelsStore } from '@/hooks/store/channels.store';
import { usePostsStore } from '@/hooks/store/posts.store';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { FanProfilesEntity, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { EventTypes, triggerSparkles } from '@workspace/ui/lib';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const Events = () => {
  const { setFan, fan } = useFan();
  const { setChannel, setChannels } = useChannelsStore();
  const { setPost, setPostAssets } = usePostsStore();
  const { setVaultObjects, setVault } = useVaultsStore();

  const onSuccess = () => {
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1200);
      }),
      {
        loading: 'Processing your unlock 🔄',
        success: () => (
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold">🎉 Content Unlocked!</span>
            <span className="text-sm">
              You&apos;ve gained access to <strong>exclusive content</strong> ✨
            </span>
          </div>
        ),
        error: 'Oops! Something went wrong 💔'
      }
    );

    triggerSparkles();
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

  const onPostUnlocked = async (event: CustomEvent) => {
    const { data } = event.detail;
    const { post: purchased_post, postAssets } = data.purchasedPost;
    setPost((prev) => {
      return { ...prev, isPurchased: purchased_post.isPurchased, preview: purchased_post.preview };
    });
    setPostAssets(postAssets);
    onSuccess();
  };

  const onVaultObjectUnlocked = async (event: CustomEvent) => {
    const { data } = event.detail;
    const { vaultObject: pvo, vault } = data.purchasedVaultObject;

    setVault((prev) => {
      return {
        ...prev,
        isPurchased: vault.isPurchased,
        unlockPrice: vault.unlockPrice,
        preview: vault.preview
      };
    });

    setVaultObjects((prev) =>
      prev.map((vaultObject) =>
        vaultObject.id === pvo.id
          ? {
              ...vaultObject,
              isPurchased: pvo.isPurchased,
              rawUrl: pvo.rawUrl
            }
          : vaultObject
      )
    );

    onSuccess();
  };

  const onVaultUnlocked = async (event: CustomEvent) => {
    const { data } = event.detail;
    const { vault: purchased_vault, vaultObjects: purchasedVaultObjects } = data.purchasedVault;

    setVault((prev) => {
      return {
        ...prev,
        isPurchased: purchased_vault.isPurchased,
        preview: purchased_vault.preview,
        vaultObjects: prev.vaultObjects.map((vaultObject) => {
          const purchased = purchasedVaultObjects.find((pvo: VaultObjectsEntity) => pvo.id === vaultObject.id);
          return purchased
            ? {
                ...vaultObject,
                isPurchased: purchased.isPurchased,
                rawUrl: purchased.rawUrl
              }
            : vaultObject;
        })
      };
    });
    onSuccess();
  };

  const onZonePurchase = async (event: CustomEvent) => {
    const { data } = event.detail;
    const { currentZone, hasZoneMembership } = data.purchasedZone;
    setFan({ ...fan, hasZoneMembership, currentZone } as FanProfilesEntity);
  };

  const onSendMessageFromCreator = async (event: CustomEvent) => {
    const { data } = event.detail;
    const newMessage = data.newMessage;
    setChannel((prev) => {
      const prevMessages = prev?.messages ?? [];
      return { ...prev, messages: [newMessage, ...prevMessages] };
    });
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
    const onUpdateChannelLastMessageHandler = (e: Event) => onUpdateChannelLastMessage(e as CustomEvent);
    const postUnlockHandler = (e: Event) => onPostUnlocked(e as CustomEvent);
    const zonePurchaseHandler = (e: Event) => onZonePurchase(e as CustomEvent);
    const vaultObjectUnlockHandler = (e: Event) => onVaultObjectUnlocked(e as CustomEvent);
    const vaultUnlockHandler = (e: Event) => onVaultUnlocked(e as CustomEvent);
    const sendHandler = (e: Event) => onSendMessageFromCreator(e as CustomEvent);
    const updateHandler = (e: Event) => onUpdateMessage(e as CustomEvent);
    const deleteHandler = (e: Event) => onDeleteMessage(e as CustomEvent);
    const deleteManyHandler = (e: Event) => onDeleteMessages(e as CustomEvent);
    const onSeenMessageHandler = (e: Event) => onSeenMessage(e as CustomEvent);

    eventEmitter.addEventListener(EventTypes.LastMessage, onUpdateChannelLastMessageHandler);
    eventEmitter.addEventListener(EventTypes.PostUnlocked, postUnlockHandler);
    eventEmitter.addEventListener(EventTypes.ZonePurchased, zonePurchaseHandler);
    eventEmitter.addEventListener(EventTypes.VaultUnlocked, vaultUnlockHandler);
    eventEmitter.addEventListener(EventTypes.VaultObjectUnlocked, vaultObjectUnlockHandler);
    eventEmitter.addEventListener(EventTypes.SendMessageFromCreator, sendHandler);
    eventEmitter.addEventListener(EventTypes.UpdateMessage, updateHandler);
    eventEmitter.addEventListener(EventTypes.DeleteMessage, deleteHandler);
    eventEmitter.addEventListener(EventTypes.DeleteMessages, deleteManyHandler);
    eventEmitter.addEventListener(EventTypes.MessageSeen, onSeenMessageHandler);

    return () => {
      eventEmitter.removeEventListener(EventTypes.PostUnlocked, postUnlockHandler);
      eventEmitter.removeEventListener(EventTypes.ZonePurchased, zonePurchaseHandler);
      eventEmitter.removeEventListener(EventTypes.VaultUnlocked, vaultUnlockHandler);
      eventEmitter.removeEventListener(EventTypes.VaultObjectUnlocked, vaultObjectUnlockHandler);
      eventEmitter.removeEventListener(EventTypes.SendMessageFromCreator, sendHandler);
      eventEmitter.removeEventListener(EventTypes.LastMessage, onUpdateChannelLastMessageHandler);
      eventEmitter.removeEventListener(EventTypes.UpdateMessage, updateHandler);
      eventEmitter.removeEventListener(EventTypes.DeleteMessage, deleteHandler);
      eventEmitter.removeEventListener(EventTypes.DeleteMessages, deleteManyHandler);
      eventEmitter.removeEventListener(EventTypes.MessageSeen, onSeenMessageHandler);
    };
  }, []); //eslint-disable-line

  return null;
};
