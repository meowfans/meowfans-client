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

export const Sse = () => {
  const { setFan, fan } = useFan();
  const { setChannel } = useChannelsStore();
  const { setPost, setPostAssets, post } = usePostsStore();
  const { setVaultObjects, setVault, vault, vaultObjects } = useVaultsStore();

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
              You’ve gained access to <strong>exclusive content</strong> ✨
            </span>
          </div>
        ),
        error: 'Oops! Something went wrong 💔'
      }
    );

    triggerSparkles();
  };

  const onPostUnlocked = async (event: CustomEvent) => {
    const { data } = event.detail;
    await new Promise((res) => setTimeout(res, 2500));
    const { post: purchased_post, postAssets } = data.purchasedPost;
    setPost({ ...post, isPurchased: purchased_post.isPurchased, preview: purchased_post.preview });
    setPostAssets(postAssets);
    onSuccess();
  };

  const onVaultObjectUnlocked = async (event: CustomEvent) => {
    const { data } = event.detail;
    await new Promise((res) => setTimeout(res, 2500));
    const { vaultObject: purchasedVaultObject, vault: purchasedVault } = data.purchasedVaultObject;

    setVault({
      ...vault,
      isPurchased: purchasedVault.isPurchased,
      unlockPrice: purchasedVault.unlockPrice,
      preview: purchasedVault.preview
    });

    setVaultObjects(
      vaultObjects.map((vaultObject) =>
        vaultObject.id === purchasedVaultObject.id
          ? {
              ...vaultObject,
              isPurchased: purchasedVaultObject.isPurchased,
              asset: { ...vaultObject.asset, rawUrl: purchasedVaultObject.asset.rawUrl }
            }
          : vaultObject
      ) as VaultObjectsEntity[]
    );

    onSuccess();
  };

  const onVaultUnlocked = async (event: CustomEvent) => {
    const { data } = event.detail;
    await new Promise((res) => setTimeout(res, 2500));
    const { vault: purchased_vault, vaultObjects: purchasedVaultObjects } = data.purchasedVault;

    setVaultObjects(
      vaultObjects.map((vaultObject) => {
        const purchased = purchasedVaultObjects.find((pvo: any) => pvo.id === vaultObject.id);
        return purchased
          ? {
              ...vaultObject,
              isPurchased: purchased.isPurchased,
              asset: { ...vaultObject.asset, rawUrl: purchased.purchasedUrl }
            }
          : vaultObject;
      }) as VaultObjectsEntity[]
    );

    setVault({ ...vault, isPurchased: purchased_vault.isPurchased, preview: purchased_vault.preview });
    onSuccess();
  };

  const onZonePurchase = async (event: CustomEvent) => {
    const { data } = event.detail;
    await new Promise((res) => setTimeout(res, 2500));
    const { currentZone, hasZoneMembership } = data.purchasedZone;
    setFan({ ...fan, hasZoneMembership, currentZone } as FanProfilesEntity);
  };

  const onSendMessageFromCreator = async (event: CustomEvent) => {
    const { data } = event.detail;
    const newMessage = data.newMessage;
    setChannel((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, newMessage]
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
    const postUnlockHandler = (e: Event) => onPostUnlocked(e as CustomEvent);
    const zonePurchaseHandler = (e: Event) => onZonePurchase(e as CustomEvent);
    const vaultObjectUnlockHandler = (e: Event) => onVaultObjectUnlocked(e as CustomEvent);
    const vaultUnlockHandler = (e: Event) => onVaultUnlocked(e as CustomEvent);
    const sendHandler = (e: Event) => onSendMessageFromCreator(e as CustomEvent);
    const updateHandler = (e: Event) => onUpdateMessage(e as CustomEvent);
    const deleteHandler = (e: Event) => onDeleteMessage(e as CustomEvent);
    const deleteManyHandler = (e: Event) => onDeleteMessages(e as CustomEvent);

    eventEmitter.addEventListener(EventTypes.PostUnlocked, postUnlockHandler);
    eventEmitter.addEventListener(EventTypes.ZonePurchased, zonePurchaseHandler);
    eventEmitter.addEventListener(EventTypes.VaultUnlocked, vaultUnlockHandler);
    eventEmitter.addEventListener(EventTypes.VaultObjectUnlocked, vaultObjectUnlockHandler);
    eventEmitter.addEventListener(EventTypes.SendMessageFromCreator, sendHandler);
    eventEmitter.addEventListener(EventTypes.UpdateMessage, updateHandler);
    eventEmitter.addEventListener(EventTypes.DeleteMessage, deleteHandler);
    eventEmitter.addEventListener(EventTypes.DeleteMessages, deleteManyHandler);

    return () => {
      eventEmitter.removeEventListener(EventTypes.PostUnlocked, postUnlockHandler);
      eventEmitter.removeEventListener(EventTypes.ZonePurchased, zonePurchaseHandler);
      eventEmitter.removeEventListener(EventTypes.VaultUnlocked, vaultUnlockHandler);
      eventEmitter.removeEventListener(EventTypes.VaultObjectUnlocked, vaultObjectUnlockHandler);
      eventEmitter.removeEventListener(EventTypes.SendMessageFromCreator, sendHandler);
      eventEmitter.removeEventListener(EventTypes.UpdateMessage, updateHandler);
      eventEmitter.removeEventListener(EventTypes.DeleteMessage, deleteHandler);
      eventEmitter.removeEventListener(EventTypes.DeleteMessages, deleteManyHandler);
    };
  }, []); //eslint-disable-line

  return null;
};
