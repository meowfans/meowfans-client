import { useChannelMessages } from '@/hooks/useMessages';
import { Badge } from '@workspace/ui/components/badge';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useParams } from 'next/navigation';
import { MessageContainer } from './Container';
import { MessageHeader } from './Header';
import { MessageInput } from './Input';

export const Message = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const { channel } = useChannelMessages({ relatedEntityId: channelId, take: 30 });

  return (
    <PageManager className="relative p-0">
      <MessageHeader />
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-linear-to-b from-background via-background to-muted/20" />
        <div className="absolute inset-x-0 -top-24 mx-auto h-72 w-72 rounded-full bg-muted/30 blur-3xl" />
        <div className="absolute -right-16 top-24 h-72 w-72 rounded-full bg-muted/20 blur-3xl" />
      </div>
      <div className="pt-20 pb-24 px-4">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">{channel.creatorProfile.user.username ?? 'Channel'}</h1>
            <Badge variant="secondary">Private</Badge>
          </div>
          <MessageContainer messages={channel.messages} />
        </div>
      </div>
      <MessageInput />
    </PageManager>
  );
};
