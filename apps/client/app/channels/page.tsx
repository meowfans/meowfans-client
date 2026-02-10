import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { ChannelsView } from './components/Channels';

export const metadata: Metadata = {
  ...ROUTE_METADATA.channels
};

export default function ChannelsPage() {
  return <ChannelsView />;
}
