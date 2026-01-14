'use client';

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
import { useRouter } from 'next/navigation';
import React from 'react';
import { Channel } from './Channels';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { useBackground } from '@workspace/ui/hooks/useBackground';

interface Props extends React.ComponentProps<typeof Sidebar> {
  isActive?: boolean;
  channels: Channel[];
}

export const ChannelListBar: React.FC<Props> = ({ channels, ...props }) => {
  const router = useRouter();
  const { bgColor } = useBackground();

  return (
    <Sidebar {...props}>
      <SidebarContent className={bgColor}>
        <SidebarGroup>
          <SidebarGroupLabel>Members</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {channels.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild onClick={() => router.push(`/channels/${item.path}`)}>
                    <div className="flex flex-row">
                      <SAvatar url={'/icons/app_icon.svg'} />
                      <span>{item.name}</span>
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
