import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { getChannels } from '../server/getChannels';
import { Channels } from './components/Channels';

export const metadata: Metadata = {
  ...ROUTE_METADATA.channels
};

export const dynamic = 'force-dynamic';

export default async function ChannelsPage() {
  const channels = await getChannels({
    take: 20,
    skip: 0
  });
  return <Channels initialChannels={channels} />;
}
