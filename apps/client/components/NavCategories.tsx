'use client';

import { ArrowUpRight, Link as LucideLink, MoreHorizontal } from 'lucide-react';

import { configService } from '@/util/config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@workspace/ui/components/sidebar';
import { handlePathName } from '@workspace/ui/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavCategories({
  categories
}: {
  categories: {
    name: string;
    url: string;
    emoji: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Category</SidebarGroupLabel>
      <SidebarMenu>
        {categories.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={handlePathName(pathname) === item.url}>
              <Link href={item.url}>
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-lg" side={isMobile ? 'bottom' : 'right'} align={isMobile ? 'end' : 'start'}>
                <DropdownMenuItem onClick={() => window.navigator.clipboard.writeText(`${configService.NEXT_PUBLIC_APP_URL}${item.url}`)}>
                  <LucideLink className="text-muted-foreground" />
                  <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open(`${configService.NEXT_PUBLIC_APP_URL}${item.url}`, '_blank')}>
                  <ArrowUpRight className="text-muted-foreground" />
                  <span>Open in New Tab</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
