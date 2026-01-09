'use client';

import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { LikeButton } from '@/components/LikeButton';
import { PurchaseSheet } from '@/components/modals/PurchaseSheet';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useLikes } from '@/hooks/useLikes';
import { PurchaseType } from '@workspace/gql/generated/graphql';
import { EllipsisDescription } from '@workspace/ui/globals/EllipsisDescription';
import { LinkDescription } from '@workspace/ui/globals/LinkDescription';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { cn } from '@workspace/ui/lib/utils';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  onExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  expanded: boolean;
}

export const SingleVaultHeader: React.FC<Props> = ({ expanded, onExpanded }) => {
  const { fan } = useFan();
  const { likeVault } = useLikes();
  const { setVault, vault } = useVaultsStore();

  const handleLikeVault = useDebouncedCallback(async (vaultId: string) => {
    const isLiked = await likeVault(vaultId);
    setVault({ ...vault, isLiked: !!isLiked });
  }, 350);

  if (!vault) return null;

  const creatorName = vault.creatorProfile.user.username.toUpperCase();

  return (
    <div className="flex flex-wrap items-start gap-6 mb-10">
      <SAvatar url={vault.preview} className={cn('h-28 w-28 shrink-0 rounded-full border-4  shadow-md object-cover')} />

      <div className="flex-1 min-w-[250px]">
        <EllipsisDescription
          expanded={expanded}
          onExpanded={onExpanded}
          description={vault.description}
          lineClamp={3}
          className="text-base text-gray-700 dark:text-gray-300"
        />

        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {vault.creatorProfile.user.username !== 'porn' ? (
            <span>
              Captured by
              <LinkDescription
                href={`/creators/${vault.creatorProfile.user.username}`}
                className="text-pink-500 hover:text-pink-400 font-medium transition-colors"
                description={creatorName}
              />
              ✨ — Sharing creativity with passion.
            </span>
          ) : (
            <LinkDescription
              href={`/creators/${vault.creatorProfile.user.username}`}
              className="text-pink-500 font-semibold"
              description={creatorName}
            />
          )}
          <ExoAdProvider zoneId="5770664" zoneType={ExoAdZoneTypes.MobileBanner} />
        </div>

        {vault.isPurchased ? (
          <div className="mt-4 flex gap-2">
            <LikeButton isLiked={!!fan && vault.isLiked} onLikeDisLike={() => handleLikeVault(vault.id)} />
          </div>
        ) : (
          vault.unlockPrice && (
            <div className="mt-4 flex flex-col gap-2 bg-linear-to-r from-purple-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-xl border border-pink-200 dark:border-zinc-700 shadow-sm">
              <PurchaseSheet entityId={vault.id} amount={vault.unlockPrice} purchaseType={PurchaseType.Vault} creatorId={vault.creatorId} />
              <p className="text-xl text-center text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium">
                Unlock all exclusive content ({vault.objectCount}) for just ${vault.unlockPrice} — or purchase individual vault items
                anytime!
              </p>
            </div>
          )
        )}
        <ExoAdProvider zoneId="5771480" />
        <ExoAdProvider zoneId="5771444" zoneType={ExoAdZoneTypes.MobileBanner} />
      </div>
    </div>
  );
};
