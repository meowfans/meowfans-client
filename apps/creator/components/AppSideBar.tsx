'use client';

import { useCreator } from '@/hooks/context/useCreator';
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
import {
  BarChart,
  Bell,
  ChevronsUpDown,
  Folder,
  Gamepad2,
  Image,
  LayoutDashboard,
  LifeBuoy,
  Lock,
  LogOut,
  MessageCircle,
  Palette,
  Send,
  Settings,
  User,
  Users2
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { creator } = useCreator();
  const { setOpenLogoutModal } = useUtilsStore();
  const { openMobile, setOpenMobile } = useSidebar();

  const data = {
    user: {
      name: creator.user?.username || 'Creator',
      avatar: creator.user?.avatarUrl || MEOW_FANS_AVATAR
    },
    navMain: [
      {
        title: 'Playground',
        items: [{ label: 'Playground', url: '/playground', icon: Gamepad2 }]
      },
      {
        title: 'Entertainment',
        items: [{ label: 'Dashboard', url: '/dashboard', icon: LayoutDashboard }]
      },
      {
        title: 'Studio',
        items: [
          { label: 'Posts Studio', url: '/posts-studio', icon: Palette },
          { label: 'Vaults Studio', url: '/vaults-studio', icon: Lock },
          { label: 'Asset Library', url: '/assets', icon: Folder },
          { label: 'Album', url: '/album', icon: Image }
        ]
      },
      {
        title: 'Community',
        items: [
          { label: 'Channels', url: '/channels', icon: MessageCircle },
          { label: 'Notifications', url: '/notifications', icon: Bell },
          { label: 'Subscribers', url: '/subscribers', icon: User },
          { label: 'Followers', url: '/followers', icon: Users2 }
        ]
      },
      {
        title: 'Insights',
        items: [{ label: 'Analytics', url: '/analytics', icon: BarChart }]
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
          <SidebarMenuItem className="flex flex-row justify-between">
            <AnimatedLogo className="h-10 w-10" />
            <ApplyTheme />
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
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{data.user.name}</span>
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
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{data.user.name}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild onClick={handleCloseOnMobile}>
                    <Link href={`/${(creator as any)?.user?.username}`}>
                      <IconLabel icon={User} label="Profile" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onClick={handleCloseOnMobile}>
                    <Link href="/settings">
                      <IconLabel icon={Settings} label="Settings" />
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild onClick={handleCloseOnMobile}>
                  <Link href="/support">
                    <IconLabel icon={LifeBuoy} label="Support" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={handleCloseOnMobile}>
                  <Link href="/feedback">
                    <IconLabel icon={Send} label="Feedback" />
                  </Link>
                </DropdownMenuItem>
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
