import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { getLikedVaults } from '../../server/getLikedVaults';
import { LikedVaults } from './components/LikedVaults';

export const metadata: Metadata = {
  ...ROUTE_METADATA.liked
};

export const dynamic = 'force-dynamic';

export default async function LikedVaultsPage() {
  const vaultLikes = await getLikedVaults({ take: 30 });
  return <LikedVaults initialVaultLikes={vaultLikes} />;
}
