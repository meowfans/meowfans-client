'use client';

import { type LucideIcon } from 'lucide-react';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@workspace/ui/components/sidebar';
import { useParams, usePathname } from 'next/navigation';

export function NavMain({
  items
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = usePathname();
  const { channelId, username } = useParams();

  const handlePathName = () => {
    switch (pathname) {
      case `/channels/${channelId}`:
        return '/channels';
      case `/vaults/${username}`:
        return '/vaults';
      case `/assets/${username}`:
        return '/assets';
      case `/profiles/${username}`:
      case `/profiles/${username}/details`:
        return '/profiles';
      default:
        return pathname;
    }
  };
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={handlePathName() === item.url}>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
