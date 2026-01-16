'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useNormalizePath } from '@/hooks/useNormalizePath';
import { appSideBarButtonOptions } from '@/lib/constants';
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
import { useMotionLoader } from '@workspace/ui/hooks/useMotionLoader';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const AppSidebar = () => {
  const router = useRouter();
  const controls = useMotionLoader(5000);
  const { bgColor } = useBackground();
  const { creator } = useCreator();
  const { isAuthenticatedPath, normalizedPath, username } = useNormalizePath();

  const sidebarItems = appSideBarButtonOptions.map((item) => {
    if (item.path === '/profile') {
      return {
        ...item,
        path: `/${username}`,
        title: 'Profile',
        url: creator.user.avatarUrl
      };
    }
    return item;
  });

  return !isAuthenticatedPath ? null : (
    <Sidebar>
      <SidebarContent className={bgColor}>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-row justify-between">MEOWFANS</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive = normalizedPath === item.path;

                return (
                  <SidebarMenuItem key={item.title} className="rounded-2xl">
                    <SidebarMenuButton
                      className={isActive ? 'bg-sidebar-border text-sidebar-accent-foreground' : ''}
                      asChild
                      onClick={() => router.push(item.path)}
                    >
                      <div className="flex flex-row gap-2">
                        {isActive && !item.url ? (
                          <motion.div animate={controls}>
                            <item.icon />
                          </motion.div>
                        ) : item.url ? (
                          <SAvatar url={item.url} className="w-5 h-5" />
                        ) : (
                          <item.icon />
                        )}
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
