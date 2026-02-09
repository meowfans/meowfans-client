'use client';

import { useAdmin } from '@/hooks/context/AdminContextWrapper';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { IconLabel } from '@workspace/ui/components/icon-label';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from '@workspace/ui/components/sidebar';
import { AnimatedLogo } from '@workspace/ui/globals/AnimatedLogo';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { CheckCircle2, ChevronsUpDown, LayoutDashboard, Lock, LogOut, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { admin } = useAdmin();
  const { setOpenLogoutModal } = useUtilsStore();
  const { openMobile, setOpenMobile } = useSidebar();

  const data = {
    user: {
      name: admin?.user?.username || 'Admin',
      avatar: admin?.user?.avatarUrl || MEOW_FANS_AVATAR
    },
    navMain: [
      {
        title: 'Management',
        items: [
          { label: 'Dashboard', url: '/', icon: LayoutDashboard },
          { label: 'Vaults', url: '/vaults', icon: Lock },
          { label: 'Profiles', url: '/profiles', icon: Users },
          { label: 'Approvals', url: '/approvals', icon: CheckCircle2 }
        ]
      },
      {
        title: 'System',
        items: [{ label: 'Settings', url: '/settings', icon: Settings }]
      }
    ]
  };

  const handleCloseOnMobile = () => {
    if (openMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-row justify-between pt-2">
            <div className="flex items-center gap-2 px-2">
              <AnimatedLogo className="h-8 w-8" />
              <span className="text-lg group-data-[collapsible=icon]:hidden">Admin</span>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <ApplyTheme />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label} onClick={handleCloseOnMobile}>
                    <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.label}>
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                      {data.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{data.user.name}</span>
                    <span className="truncate text-xs text-muted-foreground uppercase font-bold tracking-wider">Administrator</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={data.user.avatar} alt={data.user.name} />
                      <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                        {data.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{data.user.name}</span>
                      <span className="truncate text-xs text-muted-foreground font-medium">@{data.user.name}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild onClick={handleCloseOnMobile}>
                    <Link href="/settings">
                      <IconLabel icon={Settings} label="Settings" />
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    handleCloseOnMobile();
                    setOpenLogoutModal(true);
                  }}
                >
                  <IconLabel icon={LogOut} label="Log out" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
