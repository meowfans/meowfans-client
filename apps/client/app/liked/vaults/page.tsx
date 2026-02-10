import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { LikedVaults } from './components/LikedVaults';

export const metadata: Metadata = {
  ...ROUTE_METADATA.liked
};

export default function LikedVaultsPage() {
  return <LikedVaults />;
}
