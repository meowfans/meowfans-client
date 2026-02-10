import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { LikedPosts } from './components/LikedPosts';

export const metadata: Metadata = {
  ...ROUTE_METADATA.liked
};

export default function LikedPostsPage() {
  return <LikedPosts />;
}
