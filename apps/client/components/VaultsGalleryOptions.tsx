'use client';

import { AuthAwareButton } from '@/components/AuthAwareButton';
import { useLikes } from '@/hooks/useLikes';
import { VaultsEntity } from '@workspace/gql/generated/graphql';
import { GalleryHorizontalEnd } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { LikeButton } from './LikeButton';
import { Badge } from '@workspace/ui/components/badge';

interface VaultsGalleryOptionsProps {
  vault: VaultsEntity;
}

export const VaultsGalleryOptions: React.FC<VaultsGalleryOptionsProps> = ({ vault }) => {
  const router = useRouter();
  const { likeVault } = useLikes();
  const handleDebounceLikeVault = useDebouncedCallback(likeVault, 350);

  return (
    <div
      className={`
        relative flex flex-col justify-between
        h-full w-full rounded-xl overflow-hidden
        bg-linear-to-b from-black/10 via-black/20 to-black/40
      `}
    >
      {vault.objectCount > 1 && (
        <div className="absolute top-2 right-2 z-20">
          <Badge className="flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
            {vault.objectCount}
            <GalleryHorizontalEnd className="h-4 w-4 fill-white" />
          </Badge>
        </div>
      )}

      {vault.isPurchased ? (
        <div
          className={`
            absolute bottom-0 inset-x-0 z-10
            bg-linear-to-t from-black/80 via-black/30 to-transparent
            p-3 flex justify-between items-end
          `}
        >
          <p className="truncate text-xs sm:text-sm md:text-base text-white max-w-[70%]">{vault.description || 'No description'}</p>
          <LikeButton
            isLiked={vault.isLiked}
            className="hover:text-red-500 rounded-xl transition pointer-events-auto"
            variant="secondary"
            size="sm"
            title="Like"
            onLikeDisLike={() => handleDebounceLikeVault(vault.id)}
          />
        </div>
      ) : (
        <div
          className={`
            absolute inset-0 flex flex-col items-center justify-center
            text-center z-10 backdrop-blur-sm bg-black/40
            p-4 rounded-xl
          `}
        >
          <AuthAwareButton
            size="default"
            className="h-fit w-fit px-4 py-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold"
            onClick={() => router.push(`/vaults/${vault.id}`)}
          >
            Unlock for ${vault.unlockPrice}
          </AuthAwareButton>
          <p
            className={`
              text-xs sm:text-sm mt-2
              text-transparent bg-clip-text
              bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400
              font-medium leading-snug
            `}
          >
            Unlock all exclusive content for just ${vault.unlockPrice}.<br />
            Click to purchase individual items or unlock the vault.
          </p>
        </div>
      )}
    </div>
  );
};
