'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { usePostsStore } from '@/hooks/store/posts.store';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useWebhookStore } from '@/hooks/store/webhook.store';
import { FanProfilesEntity, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { EventTypes, triggerSparkles } from '@workspace/ui/lib';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const Sse = () => {
  const { setFan, fan } = useFan();
  const { setPost, setPostAssets, post } = usePostsStore();
  const { setVaultObjects, setVault, vault, vaultObjects } = useVaultsStore();
  const { setWebhook, webhook } = useWebhookStore();

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
    setWebhook(false);
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

  useEffect(() => {
    if (webhook) {
      eventEmitter.addEventListener(EventTypes.PostUnlocked, (event) => onPostUnlocked(event as any));
      eventEmitter.addEventListener(EventTypes.ZonePurchased, (event) => onZonePurchase(event as any));
      eventEmitter.addEventListener(EventTypes.VaultObjectUnlocked, (event) => onVaultObjectUnlocked(event as any));
      eventEmitter.addEventListener(EventTypes.VaultUnlocked, (event) => onVaultUnlocked(event as any));
      eventEmitter.addEventListener(EventTypes.Ping, (event) => console.log(event));
    }

    return () => {
      if (webhook) {
        eventEmitter.removeEventListener(EventTypes.ZonePurchased, (event) => onZonePurchase(event as any));
        eventEmitter.removeEventListener(EventTypes.PostUnlocked, (event) => onPostUnlocked(event as any));
        eventEmitter.removeEventListener(EventTypes.VaultObjectUnlocked, (event) => onVaultObjectUnlocked(event as any));
        eventEmitter.removeEventListener(EventTypes.VaultUnlocked, (event) => onVaultUnlocked(event as any));
      }
    };
  }, [webhook]); // eslint-disable-line

  return null;
};
