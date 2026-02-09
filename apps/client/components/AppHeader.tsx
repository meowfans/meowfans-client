'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { useFeaturePath } from '@/hooks/useFeaturePath';
import { configService } from '@/util/config';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@workspace/ui/components/sheet';
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
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsSheetOpen(false);
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
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={fan.user?.avatarUrl || undefined} alt={fan.user?.username || 'User'} />
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {fan.user?.username?.slice(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 p-6">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={fan.user?.avatarUrl || undefined} alt={fan.user?.username || 'User'} />
                    <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                      {fan.user?.username?.slice(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-lg font-black tracking-tight">@{fan.user?.username}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Fan Account</span>
                  </div>
                </SheetTitle>
                <SheetDescription className="sr-only">Account management and settings</SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-2 pt-4">
                <Button
                  variant="ghost"
                  className="justify-start h-12 rounded-2xl gap-3 font-bold"
                  onClick={() => handleNavigate('/profile')}
                >
                  <User className="h-5 w-5 text-primary" />
                  <span>Your Profile</span>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start h-12 rounded-2xl gap-3 font-bold"
                  onClick={() => handleNavigate('/settings?tab=display')}
                >
                  <Settings className="h-5 w-5 text-primary" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start h-12 rounded-2xl gap-3 font-bold"
                  onClick={() => handleNavigate('/billing')}
                >
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>Billing & Payments</span>
                </Button>
              </div>

              <div className="mt-auto pb-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 rounded-2xl gap-3 font-bold text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  onClick={() => {
                    setOpenLogoutModal(true);
                    setIsSheetOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
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
