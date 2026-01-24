'use client';

import { useChannelsStore } from '@/hooks/store/channels.store';
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
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props extends React.ComponentProps<typeof Sidebar> {
  isActive?: boolean;
}

export const ChannelListBar: React.FC<Props> = ({ ...props }) => {
  const { channels } = useChannelsStore();
  const router = useRouter();
  const { bgColor } = useBackground();

  return (
    <Sidebar {...props}>
      <SidebarContent className={bgColor}>
        <SidebarGroup>
          <SidebarGroupLabel>Members</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {channels.map((channel, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild onClick={() => router.push(`/channels/${channel.id}`)}>
                    <div className="flex flex-row">
                      <SAvatar url={channel.creatorProfile?.user?.avatarUrl} />
                      <span>{channel.label}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
