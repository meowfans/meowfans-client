'use client';

import { appSideBarButtonOptions, authenticatedPaths } from '@/lib/constants';
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
import { MotionPresets } from '@workspace/ui/globals/MotionPresets';
import { X } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { channelId, id } = useParams();
  const { setOpen } = useSidebar();
  const isNotAuthenticated =
    !authenticatedPaths.includes(pathname) &&
    !pathname.startsWith('/channels') &&
    !pathname.startsWith('/posts') &&
    !pathname.startsWith('/assets');

  if (isNotAuthenticated) return null;

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

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-row justify-between">
            MEOW
            {isNotAuthenticated && (
              <Button variant={'outline'} onClick={() => setOpen(false)}>
                <X />
              </Button>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {appSideBarButtonOptions.map((item) => (
                <SidebarMenuItem key={item.title} className="rounded-2xl  ">
                  <MotionPresets motionType="SlideRightToLeft">
                    <SidebarMenuButton
                      className={`${handlePathName() === item.path && 'bg-blue-200'} `}
                      asChild
                      onClick={() => router.push(item.path)}
                    >
                      <div className="flex flex-row">
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </MotionPresets>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
