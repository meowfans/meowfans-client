import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { getLikedPosts } from '../server/getLikedPosts';
import { getLikedVaultObjects } from '../server/getLikedVaultObjects';
import { getLikedVaults } from '../server/getLikedVaults';
import { Liked } from './components/Liked';

export const metadata: Metadata = {
  ...ROUTE_METADATA.liked
};

export const dynamic = 'force-dynamic';

export default async function LikedPage() {
  const postLikes = await getLikedPosts({ take: 4 });
  const vaultObjectLikes = await getLikedVaultObjects({ take: 4 });
  const vaultLikes = await getLikedVaults({ take: 4 });
  return <Liked initialPostLikes={postLikes} initialVaultObjectLikes={vaultObjectLikes} initialVaultLikes={vaultLikes} />;
}
