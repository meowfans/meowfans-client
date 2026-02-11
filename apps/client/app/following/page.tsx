import { getFollowings } from '@/app/server/getFollowings';
import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Following } from './components/Following';

export const metadata: Metadata = {
  ...ROUTE_METADATA.following
};

export const dynamic = 'force-dynamic';

export default async function FollowingPage() {
  const followings = await getFollowings({ take: 30 });
  return <Following initialFollowings={followings} />;
}
