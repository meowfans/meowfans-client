'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { FEATURE_FLAGS } from '@/lib/constants/feature-paths';
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
  Album,
  ArrowDownAZ,
  BadgeCheck,
  BadgeDollarSign,
  ChevronsUpDown,
  DollarSignIcon,
  Flame,
  GalleryHorizontal,
  GalleryVerticalEnd,
  GraduationCap,
  Group,
  HardHat,
  Heart,
  History,
  Home,
  ImageDown,
  LifeBuoy,
  Lightbulb,
  Image as LucideImage,
  Mails,
  Scale,
  Send,
  Sparkles,
  Trash2,
  Trophy,
  VerifiedIcon,
  Video
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export function AppSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { fan } = useFan();
  const { openMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const { setOpenLogoutModal } = useUtilsStore();

  const data = {
    user: {
      name: fan?.user?.username || 'user',
      avatar: fan?.user?.avatarUrl || MEOW_FANS_AVATAR
    },
    navMain: [
      {
        title: 'Main',
        items: [
          { label: 'Dashboard', url: '/dashboard', emoji: '', icon: Home, isEnabled: FEATURE_FLAGS['/dashboard'] },
          { label: 'Messages', url: '/channels', emoji: '', icon: Mails, isEnabled: FEATURE_FLAGS['/channels'] },
          { label: 'Following', url: '/following', emoji: '', icon: Group, isEnabled: FEATURE_FLAGS['/following'] },
          {
            label: 'Subscriptions',
            url: '/subscriptions',
            emoji: '',
            icon: BadgeDollarSign,
            isEnabled: FEATURE_FLAGS['/subscriptions']
          },
          { label: 'Watch History', url: '/history', emoji: '', icon: History, badge: '10', isEnabled: FEATURE_FLAGS['/history'] }
        ]
      },
      {
        title: 'Discover',
        items: [
          { label: 'Posts', url: '/posts', emoji: '', icon: GalleryHorizontal, isEnabled: FEATURE_FLAGS['/posts'] },
          { label: 'Creators', url: '/creators', emoji: '', icon: BadgeCheck, isEnabled: FEATURE_FLAGS['/creators'] },
          { label: 'Vaults', url: '/vaults', emoji: '', icon: GalleryVerticalEnd, isEnabled: FEATURE_FLAGS['/vaults'] },
          { label: 'Shorts', url: '/shorts', emoji: '', icon: Video, isEnabled: FEATURE_FLAGS['/shorts'] },
          { label: 'Pictures', url: '/pictures', emoji: '', icon: LucideImage, isEnabled: FEATURE_FLAGS['/pictures'] },
          { label: 'Categories', url: '/categories', emoji: '', icon: ArrowDownAZ, isEnabled: FEATURE_FLAGS['/categories'] }
        ]
      },
      {
        title: 'Premium',
        items: [{ label: 'Purchased', url: '/purchased', emoji: '', icon: DollarSignIcon, isEnabled: FEATURE_FLAGS['/purchased'] }]
      },
      {
        title: 'Trending',
        items: [
          { label: 'All ', url: '/trending', emoji: '', icon: Flame, isEnabled: FEATURE_FLAGS['/trending'] },
          { label: 'Creators ', url: '/trending/creators', emoji: '', icon: VerifiedIcon, isEnabled: FEATURE_FLAGS['/trending/creators'] },
          { label: 'Posts ', url: '/trending/posts', emoji: '', icon: GalleryHorizontal, isEnabled: FEATURE_FLAGS['/trending/posts'] },
          { label: 'Pictures ', url: '/trending/pictures', emoji: '', icon: ImageDown, isEnabled: FEATURE_FLAGS['/trending/pictures'] },
          { label: 'Vaults ', url: '/trending/vaults', emoji: '', icon: Album, isEnabled: FEATURE_FLAGS['/trending/vaults'] },
          { label: 'Top creators', url: '/top-creators', emoji: '', icon: Trophy, isEnabled: FEATURE_FLAGS['/top-creators'] }
        ]
      },
      {
        title: 'Your favorites',
        items: [
          { label: 'All ', url: '/liked', emoji: '', icon: Heart, isEnabled: FEATURE_FLAGS['/liked'] },
          { label: 'Vaults ', url: '/liked/vaults', emoji: '', icon: Flame, isEnabled: FEATURE_FLAGS['/liked/vaults'] },
          { label: 'Pictures', url: '/liked/pictures', emoji: '', icon: Lightbulb, isEnabled: FEATURE_FLAGS['/liked/pictures'] },
          { label: 'Posts', url: '/liked/posts', emoji: '', icon: GalleryHorizontal, isEnabled: FEATURE_FLAGS['/liked/posts'] }
        ]
      }
    ]
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
                  <SidebarMenuItem key={item.label} onClick={() => openMobile && setOpenMobile(false)}>
                    <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.label}>
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span className="flex-1">{item.label}</span>
                        {!item.isEnabled && <HardHat className="ml-auto h-3 w-3 text-amber-500/80" />}
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
                  <DropdownMenuItem asChild>
                    <Link href="/upgrade">
                      <IconLabel icon={Sparkles} label="Upgrade to Pro" />
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/support">
                    <div className="flex items-center justify-between w-full">
                      <IconLabel icon={LifeBuoy} label="Support" />
                      {!FEATURE_FLAGS['/support'] && <HardHat className="h-3 w-3 text-amber-500/80" />}
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/feedback">
                    <div className="flex items-center justify-between w-full">
                      <IconLabel icon={Send} label="Feedback" />
                      {!FEATURE_FLAGS['/feedback'] && <HardHat className="h-3 w-3 text-amber-500/80" />}
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tutorials">
                    <div className="flex items-center justify-between w-full">
                      <IconLabel icon={GraduationCap} label="Academy" />
                      {!FEATURE_FLAGS['/tutorials'] && <HardHat className="h-3 w-3 text-amber-500/80" />}
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/legal">
                    <div className="flex items-center justify-between w-full">
                      <IconLabel icon={Scale} label="Legal" />
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setOpenLogoutModal(true)}>
                  <IconLabel icon={Trash2} label="Log out" />
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
