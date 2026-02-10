import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { LikedPictures } from './components/LikedPictures';

export const metadata: Metadata = {
  ...ROUTE_METADATA.liked
};

export default function LikedPicturesPage() {
  return <LikedPictures />;
}
