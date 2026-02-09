'use client';

import { useCreator } from '@/hooks/context/useCreator';
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
import { ArrowLeft, Bell, LogOut, Settings, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ImpersonationTimer } from './ImpersonationTimer';
import { LogoutModal } from './LogoutModal';

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { creator } = useCreator();
  const { setOpenLogoutModal } = useUtilsStore();

  const handleBack = () => {
    router.back();
  };

  if (pathname.startsWith('/channels/')) return null;

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBack} className="h-9 w-9" aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex-1 flex justify-center px-1 md:px-4">
        <ImpersonationTimer />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative h-9 w-9" onClick={() => router.push('/notifications')}>
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={creator?.user?.avatarUrl || undefined} alt={creator?.user?.username || 'Creator'} />
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                  {creator?.user?.username?.slice(0, 2).toUpperCase() || 'C'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">@{creator?.user?.username}</p>
                <p className="text-xs leading-none text-muted-foreground">Creator Account</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/${creator?.user?.username}`)}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
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
      <LogoutModal />
    </header>
  );
}
