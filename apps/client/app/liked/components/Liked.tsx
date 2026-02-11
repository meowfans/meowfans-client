'use client';

import { useServerLikedPosts } from '@/hooks/server/useServerLikedPosts';
import { useServerLikedVaultObjects } from '@/hooks/server/useServerLikedVaultObjects';
import { useServerLikedVaults } from '@/hooks/server/useServerLikedVaults';
import { GetLikedPostsOutput, GetLikedVaultObjectsOutput, GetLikedVaultsOutput } from '@workspace/gql/generated/graphql';
import { LikedHeader } from './LikedHeader';
import { LikedPicturesSection } from './LikedPicturesSection';
import { LikedPostsSection } from './LikedPostsSection';
import { LikedVaultsSection } from './LikedVaultsSection';

interface LikedProps {
  initialPostLikes: GetLikedPostsOutput[];
  initialVaultObjectLikes: GetLikedVaultObjectsOutput[];
  initialVaultLikes: GetLikedVaultsOutput[];
}

export function Liked({ initialPostLikes, initialVaultObjectLikes, initialVaultLikes }: LikedProps) {
  const { postLikes } = useServerLikedPosts({ take: 4 }, initialPostLikes);
  const { vaultObjectLikes } = useServerLikedVaultObjects({ take: 4 }, initialVaultObjectLikes);
  const { vaultLikes } = useServerLikedVaults({ take: 4 }, initialVaultLikes);

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
