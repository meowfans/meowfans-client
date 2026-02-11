import { getSingleChannel } from '@/app/server/getSingleChannel';
import { SingleChannel } from './components/SingleChannel';

interface SingleChannelProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Channel Messages'
};

export const dynamic = 'force-dynamic';

export default async function SingleChannelPage({ params }: SingleChannelProps) {
  const { id } = await params;
  const channel = await getSingleChannel({ relatedEntityId: id, take: 20, skip: 0 });
  return <SingleChannel initialChannel={channel} channelId={id} />;
}
