import { getChannels } from '../server/getChannels';
import { ChannelsLayoutClient } from './components/ChannelsLayoutClient';

export default async function ChannelsLayout({ children }: { children: React.ReactNode }) {
  const channels = await getChannels({
    take: 20,
    skip: 0
  });

  return <ChannelsLayoutClient initialChannels={channels}>{children}</ChannelsLayoutClient>;
}
