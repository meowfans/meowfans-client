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
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import Link from 'next/link';
import React from 'react';
import { Channel } from './Channels';

interface Props extends React.ComponentProps<typeof Sidebar> {
  isActive?: boolean;
  channels: Channel[];
}

export const ChannelListBar: React.FC<Props> = ({ channels, ...props }) => {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Members</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {channels.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton>
                    <Link href={`/channels/${item.path}`}>
                      <div className="flex flex-row">
                        <SAvatar url={'/icons/app_icon.svg'} />
                        <span>{item.name}</span>
                      </div>
                    </Link>
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
