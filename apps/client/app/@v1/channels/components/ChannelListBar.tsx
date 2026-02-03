'use client';

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@workspace/ui/components/sidebar';
import { useBackground } from '@workspace/ui/hooks/useBackground';
import React from 'react';
import { ChannelList } from './ChannelList';

interface Props extends React.ComponentProps<typeof Sidebar> {
  isActive?: boolean;
}

export const ChannelListBar: React.FC<Props> = ({ ...props }) => {
  const { bgColor } = useBackground();

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
