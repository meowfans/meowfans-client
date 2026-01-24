'use client';

import { useChannelsStore } from '@/hooks/store/channels.store';
import { Badge } from '@workspace/ui/components/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@workspace/ui/components/sidebar';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { useBackground } from '@workspace/ui/hooks/useBackground';
import { BellOff, Lock, Pin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

interface Props extends React.ComponentProps<typeof Sidebar> {
  isActive?: boolean;
}

export const ChannelListBar: React.FC<Props> = ({ ...props }) => {
  const { channels } = useChannelsStore();
  const router = useRouter();
  const { bgColor } = useBackground();

  /**
   * 1. Remove soft-deleted channels
   * 2. Sort pinned first
   * 3. Sort by last message or createdAt
   */
  const orderedChannels = useMemo(() => {
    return [...channels]
      .filter((c) => !c.deletedAt)
      .sort((a, b) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;

        const aTime = a.lastMessage?.createdAt ?? a.createdAt;
        const bTime = b.lastMessage?.createdAt ?? b.createdAt;

        return new Date(bTime).getTime() - new Date(aTime).getTime();
      });
  }, [channels]);

  return (
    <Sidebar {...props}>
      <SidebarContent className={bgColor}>
        <SidebarGroup>
          <SidebarGroupLabel>Members</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {orderedChannels.map((channel) => {
                const user = channel.fanProfile?.user;

                return (
                  <SidebarMenuItem key={channel.id}>
                    <SidebarMenuButton
                      asChild
                      disabled={channel.isMessagingBlocked}
                      onClick={() => router.push(`/channels/${channel.id}`)}
                      className="h-auto min-h-18 py-3 items-start"
                    >
                      <div className="flex gap-3 w-full items-start">
                        <SAvatar url={user?.avatarUrl} />

                        <div className="flex flex-col flex-1 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold truncate">
                              {user?.firstName} {user?.lastName}
                            </span>

                            {channel.isPinned && <Pin size={14} />}
                            {channel.isMuted && <BellOff size={14} />}
                            {channel.isRestricted && <Lock size={14} />}

                            {channel.label && (
                              <Badge variant="secondary" className="text-xs">
                                {channel.label}
                              </Badge>
                            )}
                          </div>

                          <span className="text-xs text-muted-foreground truncate">@{user?.username}</span>

                          {channel.lastMessage && (
                            <span className="text-xs text-muted-foreground truncate mt-1">{channel.lastMessage.content}</span>
                          )}
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
