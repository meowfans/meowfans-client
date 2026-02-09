'use client';

import { useAdmin } from '@/hooks/context/AdminContextWrapper';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { SidebarTrigger } from '@workspace/ui/components/sidebar';
import { ArrowLeft, Bell, LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AppHeader() {
  const router = useRouter();
  const { admin } = useAdmin();
  const { setOpenLogoutModal } = useUtilsStore();

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={admin?.user?.avatarUrl || undefined} alt={admin?.user?.username || 'Admin'} />
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                  {admin?.user?.username?.slice(0, 2).toUpperCase() || 'AD'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">@{admin?.user?.username}</p>
                <p className="text-xs leading-none text-muted-foreground uppercase font-bold tracking-wider pt-0.5">Admin Account</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpenLogoutModal(true)}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
