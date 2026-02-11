import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { getLikedVaultObjects } from '../../server/getLikedVaultObjects';
import { LikedPictures } from './components/LikedPictures';

export const metadata: Metadata = {
  ...ROUTE_METADATA.liked
};

export const dynamic = 'force-dynamic';

export default async function LikedPicturesPage() {
  const vaultObjectLikes = await getLikedVaultObjects({ take: 30 });
  return <LikedPictures initialVaultObjectLikes={vaultObjectLikes} />;
}
