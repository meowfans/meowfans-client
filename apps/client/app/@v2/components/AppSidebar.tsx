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

// Reusing the same structure but this component is specific to V2 allowing for future customization
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r border-border" {...props} variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b pb-2">
        <div className="flex flex-row items-center gap-2 px-2 py-1">
          <span className="text-xl font-bold">MeowFans</span>
          <div className="ml-auto">
            <ApplyTheme />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {appSideBarButtonOptions.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <div className="font-medium text-xs tracking-wider uppercase">{item.title}</div>
              </SidebarMenuButton>
              {item.items?.length ? (
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.label}>
                      <SidebarMenuSubButton asChild className="hover:text-foreground hover:bg-secondary">
                        <Link href={subItem.url}>
                          {subItem.emoji ? <span>{subItem.emoji}</span> : <subItem.icon className="h-4 w-4" />}
                          <span>{subItem.label}</span>
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
