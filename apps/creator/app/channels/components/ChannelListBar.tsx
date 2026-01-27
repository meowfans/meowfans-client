'use client';

import { useChannelsStore } from '@/hooks/store/channels.store';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@workspace/ui/components/sidebar';
import { useBackground } from '@workspace/ui/hooks/useBackground';
import React, { useMemo } from 'react';
import { ChannelList } from './ChannelList';

interface Props extends React.ComponentProps<typeof Sidebar> {
  isActive?: boolean;
}

export const ChannelListBar: React.FC<Props> = ({ ...props }) => {
  const { bgColor } = useBackground();
  const { channels } = useChannelsStore();

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
          <SidebarGroupContent className="p-2">
            <ChannelList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
