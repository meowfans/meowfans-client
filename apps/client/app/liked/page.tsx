import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Liked } from './components/Liked';

export const metadata: Metadata = {
  ...ROUTE_METADATA.liked
};

export default function LikedPage() {
  return <Liked />;
}
