'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { useFeaturePath } from '@/hooks/useFeaturePath';
import { configService } from '@/util/config';
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
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { ArrowLeft, Bell, CreditCard, HardHat, LogOut, Settings, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogoutModal } from './LogoutModal';
import { SearchInput } from './SearchInput';

export function AppHeader() {
  const { fan } = useFan();
  const router = useRouter();
  const pathname = usePathname();
  const { isUnderConstruction } = useFeaturePath();
  const { setOpenLogoutModal } = useUtilsStore();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBack = () => {
    router.back();
  };

  if (pathname.startsWith('/channels/')) return null;

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left Section: Back Button & Sidebar Trigger */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBack} className="h-9 w-9" aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <SidebarTrigger className="-ml-1" />
        {!isUnderConstruction && <HardHat className="ml-auto h-3 w-3 text-amber-500/80" />}
      </div>

      <SearchInput />

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative h-9 w-9" onClick={() => router.push('/notifications')}>
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
        </Button>

        {mounted && fan ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={fan.user?.avatarUrl || undefined} alt={fan.user?.username || 'User'} />
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {fan.user?.username?.slice(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">@{fan.user?.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">Fan Account</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/settings?tab=display')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/billing')}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenLogoutModal(true)}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : mounted ? (
          <Button
            variant="default"
            size="sm"
            onClick={() => router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL, pathname: '/login' }))}
          >
            Sign In
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="w-20 opacity-0">
            Loading
          </Button>
        )}
      </div>
      <LogoutModal />
    </header>
  );
}
