import { ChannelDetailView } from './components/ChannelDetailView';

interface ChannelDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Channel Messages'
};

export default async function ChannelDetailPage({ params }: ChannelDetailPageProps) {
  const { id } = await params;
  return <ChannelDetailView channelId={id} />;
}
