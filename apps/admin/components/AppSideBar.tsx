'use client';

import { NavMain } from '@/components/NavMain';
import { TeamSwitcher } from '@/components/TeamSwitcher';
import { useNormalizePath } from '@/hooks/useNormalizePath';
import { appSideBarButtonOptions } from '@/lib/constants';
import { Sidebar, SidebarHeader, SidebarRail } from '@workspace/ui/components/sidebar';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isAuthenticatedPath } = useNormalizePath();

  return !isAuthenticatedPath ? null : (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex flex-row">
          <TeamSwitcher teams={appSideBarButtonOptions.teams} />
          <ApplyTheme />
        </div>
        <NavMain items={appSideBarButtonOptions.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  );
}
