import { SingleChannel } from './components/SingleChannel';

interface SingleChannelProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Channel Messages'
};

export default async function SingleChannelPage({ params }: SingleChannelProps) {
  const { id } = await params;
  return <SingleChannel channelId={id} />;
}
