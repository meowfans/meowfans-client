import { getSingleChannel } from '@/app/server/getSingleChannel';
import { CreatorDetails } from './components/CreatorDetails';
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
  const channel = await getSingleChannel({ relatedEntityId: id, take: 30 });

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex-1 min-w-0 h-full">
        <SingleChannel initialChannel={channel} channelId={id} />
      </div>
      <div className="hidden xl:block w-72 lg:w-80 flex-none h-full overflow-hidden shadow-2xl">
        <CreatorDetails channel={channel} />
      </div>
    </div>
  );
}
