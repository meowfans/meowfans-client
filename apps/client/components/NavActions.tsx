'use client';
import { Button } from '@workspace/ui/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@workspace/ui/components/sidebar';
import { navActions } from '@/lib/constants';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function NavActions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="data-[state=open]:bg-accent">
            <Menu />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-56 overflow-hidden rounded-xl p-0 shadow-lg" align="end">
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {navActions.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index} onClick={() => setIsOpen(false)}>
                          <Link href={item.url}>
                            <SidebarMenuButton>
                              <item.icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  );
}
