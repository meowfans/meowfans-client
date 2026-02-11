import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { getChannels } from '../server/getChannels';
import { getCreators } from '../server/getCreators';
import { getFanAssets } from '../server/getFanAssets';
import { getFollowings } from '../server/getFollowings';
import { Dashboard } from './components/Dashboard';

export const metadata: Metadata = {
  ...ROUTE_METADATA.dashboard
};

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const followings = await getFollowings({ take: 10 });
  const fanAssets = await getFanAssets({ take: 5 });
  const creators = await getCreators({ take: 10 });
  const channels = await getChannels({ take: 5, skip: 0 });
  return <Dashboard initialFollowings={followings} initialFanAssets={fanAssets} initialCreators={creators} initialChannels={channels} />;
}
