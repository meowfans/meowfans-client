'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useChannelMutations } from '@/hooks/useChannels';
import { CreatorFollowsEntity } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { Loader2, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface FollowerItemProps {
  follower: CreatorFollowsEntity;
}

function timeAgo(date: Date | string) {
  const d = new Date(date);
  const seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + 'y ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + 'mo ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + 'd ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + 'h ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + 'm ago';
  return 'just now';
}

export function FollowerItem({ follower }: FollowerItemProps) {
  const { creator } = useCreator();
  const { createChannel, loading } = useChannelMutations();
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);

  const user = follower.fanProfile.user;
  const username = user?.username || 'Fan';
  const fullname = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : username;
  const avatarUrl = user?.avatarUrl;

  const handleMessage = async () => {
    if (!creator) return;
    setIsCreatingChannel(true);
    await createChannel({
      creatorId: creator.creatorId,
      fanId: follower.fanId
    });
    setIsCreatingChannel(false);
  };

  const busy = loading || isCreatingChannel;

  return (
    <div className="p-2.5 flex items-center gap-3 hover:bg-muted/30 transition-colors border rounded-xl bg-card/50 overflow-hidden">
      <Avatar className="h-10 w-10 border shrink-0">
        <AvatarImage src={avatarUrl || undefined} alt={username} />
        <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          <h3 className="text-sm font-bold truncate leading-none mb-1">{fullname}</h3>
          <p className="text-[11px] text-muted-foreground truncate leading-none">@{username}</p>
        </div>
        <div className="flex items-center mt-1.5">
          <span className="text-[10px] text-muted-foreground/60 italic font-medium uppercase tracking-tighter truncate">
            Followed {timeAgo(follower.followedAt)}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleMessage}
        disabled={busy || !creator}
        className={cn(
          'h-9 px-3 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-all active:scale-95 shrink-0',
          busy && 'opacity-70'
        )}
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <MessageSquare className="h-4 w-4 sm:mr-2 shrink-0" />
            <span className="hidden sm:inline text-xs font-black uppercase italic tracking-widest truncate">Message</span>
          </>
        )}
      </Button>
    </div>
  );
}
