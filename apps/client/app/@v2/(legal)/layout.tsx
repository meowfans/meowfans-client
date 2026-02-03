'use client';

import { Button } from '@workspace/ui/components/button';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@workspace/ui/components/sheet';
import { cn } from '@workspace/ui/lib/utils';
import { Book, FileText, HelpCircle, Menu, Shield, User, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const sidebarItems = [
  {
    title: 'General Terms',
    href: '/general-terms',
    icon: FileText
  },
  {
    title: 'Terms of Service',
    href: '/terms',
    icon: Book
  },
  {
    title: 'Privacy Policy',
    href: '/privacy',
    icon: Shield
  },
  {
    title: 'Fan Terms',
    href: '/fan-terms',
    icon: User
  },
  {
    title: 'Creator Terms',
    href: '/creator-terms',
    icon: Users
  },
  {
    title: '2257 Compliance',
    href: '/2257',
    icon: FileText
  },
  {
    title: 'FAQ',
    href: '/faq',
    icon: HelpCircle
  }
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ElementType;
  }[];
}

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col space-y-1', className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'justify-start flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary transition-colors',
            pathname === item.href ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <header className="flex-none z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4 md:px-8">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 bg-background border-border text-foreground">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="px-7 py-4">
                <Link href="/" className="flex items-center space-x-2 font-bold" onClick={() => setIsOpen(false)}>
                  <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">MeowFans</span>
                </Link>
              </div>
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <SidebarNav items={sidebarItems} onClick={() => setIsOpen(false)} />
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <div className="mr-4 hidden lg:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2 font-bold">
              <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">MeowFans</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="hidden w-[240px] flex-col border-r border-border lg:flex lg:w-[280px]">
          <ScrollArea className="flex-1 py-6 pl-8 pr-4">
            <h4 className="mb-4 text-sm font-semibold tracking-tight text-muted-foreground uppercase">Legal Center</h4>
            <SidebarNav items={sidebarItems} />
          </ScrollArea>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-5xl py-6 lg:py-10 px-4 md:px-8 pb-24 lg:pb-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
