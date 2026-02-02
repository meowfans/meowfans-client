'use client';

import { useUpdateChannelStatus } from '@/hooks/useChannels';
import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

interface ChannelAcceptancePreviewProps {
  channel: ChannelsOutput;
}

export const ChannelAcceptancePreview = ({ channel }: ChannelAcceptancePreviewProps) => {
  const { updateChannelStatus, loading } = useUpdateChannelStatus();

  if (channel.status !== MessageChannelStatus.Requested) return null;

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 z-20',
        'border-t bg-background px-4 py-3',
        'flex flex-wrap items-center justify-between gap-3'
      )}
    >
      <div className="text-sm">
        <p className="font-medium">Chat request</p>
        <p className="text-muted-foreground">A fan wants to start a conversation with you.</p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => updateChannelStatus({ channelId: channel.id, status: MessageChannelStatus.Rejected })}
        >
          Reject
        </Button>

        <Button disabled={loading} onClick={() => updateChannelStatus({ channelId: channel.id, status: MessageChannelStatus.Accepted })}>
          Accept
        </Button>
      </div>
    </div>
  );
};
