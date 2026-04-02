import { Metadata } from 'next';
import { NoChatSelected } from './components/NoChatSelected';

export const metadata: Metadata = {
  title: 'All Conversations'
};

export const dynamic = 'force-dynamic';

export default function ChannelsPage() {
  return <NoChatSelected />;
}
