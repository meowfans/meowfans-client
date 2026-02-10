'use client';

import { useLikedPosts } from '@/hooks/useLikedPosts';
import { useLikedVaultObjects } from '@/hooks/useLikedVaultObjects';
import { useLikedVaults } from '@/hooks/useLikedVaults';
import { LikedHeader } from './LikedHeader';
import { LikedPicturesSection } from './LikedPicturesSection';
import { LikedPostsSection } from './LikedPostsSection';
import { LikedVaultsSection } from './LikedVaultsSection';

export function Liked() {
  const { postLikes, loading: loadingPosts } = useLikedPosts({ take: 4 });
  const { vaultObjectLikes, loading: loadingPictures } = useLikedVaultObjects({ take: 4 });
  const { vaultLikes, loading: loadingVaults } = useLikedVaults({ take: 4 });

  return (
    <div className="flex flex-1 flex-col gap-8 md:gap-12 p-4 md:p-8 pt-4 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      <LikedHeader />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
        {vaultObjectLikes.length > 0 && <LikedPicturesSection vaultObjectLikes={vaultObjectLikes} />}
        <div className="lg:col-span-5 space-y-10 md:space-y-12">
          {postLikes.length > 0 && <LikedPostsSection postLikes={postLikes} />}
          {vaultLikes.length > 0 && <LikedVaultsSection vaultLikes={vaultLikes} />}
        </div>
      </div>
    </div>
  );
}
