'use client';

import { appSideBarButtonOptions } from '@/lib/constants';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@workspace/ui/components/sidebar';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import Link from 'next/link';
import * as React from 'react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
     <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex flex-row">
          {/* <TeamSwitcher teams={appSideBarButtonOptions.teams} /> */}
          <ApplyTheme />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {appSideBarButtonOptions.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <div className="font-medium">{item.title}</div>
              </SidebarMenuButton>
              {item.items?.length ? (
                <SidebarMenuSub>
                  {item.items.map((item) => (
                    <SidebarMenuSubItem key={item.label}>
                      <SidebarMenuSubButton asChild>
                        <Link href={item.url}>
                          {item.emoji ? <span>{item.emoji}</span> : <item.icon />}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
