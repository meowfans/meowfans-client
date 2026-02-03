'use client';

import { ChannelsOutput, MessageChannelStatus } from '@workspace/gql/generated/graphql';
import { cn } from '@workspace/ui/lib/utils';

interface ChannelAcceptancePreviewProps {
  channel: ChannelsOutput;
}

export const ChannelStatusPreview = ({ channel }: ChannelAcceptancePreviewProps) => {
  if (channel.status !== MessageChannelStatus.Requested) return null;

  return (
    <div className={cn('absolute bottom-16 left-0 right-0 z-20', 'border-t bg-background px-4 py-3', 'flex items-center justify-center')}>
      <p className="text-sm text-muted-foreground">Your chat request is pending creator approval.</p>
    </div>
  );
};
