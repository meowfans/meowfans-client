import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { getLikedPosts } from '../../server/getLikedPosts';
import { LikedPosts } from './components/LikedPosts';

export const metadata: Metadata = {
  ...ROUTE_METADATA.liked
};

export const dynamic = 'force-dynamic';

export default async function LikedPostsPage() {
  const postLikes = await getLikedPosts({ take: 30 });
  return <LikedPosts initialPostLikes={postLikes} />;
}
