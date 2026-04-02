import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { NoChatSelected } from './components/NoChatSelected';

export const metadata: Metadata = {
  ...ROUTE_METADATA.channels
};

export const dynamic = 'force-dynamic';

export default function ChannelsPage() {
  return <NoChatSelected />;
}
