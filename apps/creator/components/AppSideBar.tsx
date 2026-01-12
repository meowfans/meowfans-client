'use client';

import { appSideBarButtonOptions } from '@/lib/constants';
import { getAuthenticatedPath } from '@/util/helpers';
import { Button } from '@workspace/ui/components/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@workspace/ui/components/sidebar';
import { useMotionLoader } from '@workspace/ui/hooks/useMotionLoader';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { channelId, id } = useParams();
  const { setOpen } = useSidebar();
  const controls = useMotionLoader(5000);

  const handlePathName = () => {
    switch (pathname) {
      case `/channels/${channelId}`:
        return '/channels';
      case `/posts/${id}`:
        return '/posts';
      default:
        return pathname;
    }
  };

  return getAuthenticatedPath(pathname) ? null : (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-row justify-between">
            MEOWFANS
            {getAuthenticatedPath(pathname) && (
              <Button variant={'outline'} onClick={() => setOpen(false)}>
                <X />
              </Button>
            )}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {appSideBarButtonOptions.map((item) => {
                const isActive = handlePathName() === item.path;
                return (
                  <SidebarMenuItem key={item.title} className="rounded-2xl">
                    <SidebarMenuButton
                      className={`${handlePathName() === item.path && 'bg-blue-200'} `}
                      asChild
                      onClick={() => router.push(item.path)}
                    >
                      <div className="flex flex-row">
                        {isActive ? (
                          <motion.div animate={controls}>
                            <item.icon />
                          </motion.div>
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
