'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Clock, MoreHorizontal, Settings2 } from 'lucide-react';

const MOCK_SUBSCRIPTIONS = [
  {
    id: '1',
    creatorName: 'Alex Rivers',
    username: 'alexrivers',
    avatarUrl: 'https://i.pravatar.cc/150?u=alex',
    status: 'active',
    price: 9.99,
    nextBilling: '2026-03-01',
    tier: 'Premium Fan'
  },
  {
    id: '2',
    creatorName: 'Sarah Jenkins',
    username: 'sarahj',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
    status: 'active',
    price: 14.99,
    nextBilling: '2026-02-28',
    tier: 'Super Fan'
  },
  {
    id: '3',
    creatorName: 'Marco Polo',
    username: 'marco_p',
    avatarUrl: 'https://i.pravatar.cc/150?u=marco',
    status: 'expired',
    price: 5.0,
    nextBilling: '2026-01-15',
    tier: 'Starter'
  }
];

export function SubscriptionsView() {
  const activeSubs = MOCK_SUBSCRIPTIONS.filter((s) => s.status === 'active');
  const expiredSubs = MOCK_SUBSCRIPTIONS.filter((s) => s.status === 'expired');

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8 pt-0 max-w-7xl mx-auto w-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight uppercase italic">Subscriptions</h1>
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em]">Manage your premium access and billing</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-secondary/50 rounded-full p-1 border border-border/50">
            <TabsTrigger
              value="active"
              className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all uppercase text-[10px] font-black tracking-widest"
            >
              Active ({activeSubs.length})
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all uppercase text-[10px] font-black tracking-widest"
            >
              Expired ({expiredSubs.length})
            </TabsTrigger>
          </TabsList>

          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex gap-2 rounded-full border border-border/40 text-[10px] font-black uppercase tracking-widest"
          >
            <Settings2 className="h-3 w-3" />
            Billing Settings
          </Button>
        </div>

        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSubs.map((sub, index) => (
              <SubscriptionCard key={sub.id} sub={sub} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="expired" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expiredSubs.map((sub, index) => (
              <SubscriptionCard key={sub.id} sub={sub} index={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SubscriptionCard({ sub, index }: { sub: (typeof MOCK_SUBSCRIPTIONS)[0]; index: number }) {
  const isActive = sub.status === 'active';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
      <Card className="overflow-hidden border-border/50 bg-secondary/20 shadow-none rounded-[2rem] hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all">
              <AvatarImage src={sub.avatarUrl} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">{sub.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">{sub.creatorName}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">@{sub.username}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem className="text-xs uppercase font-bold gap-2">View Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-xs uppercase font-bold gap-2">Payment Methods</DropdownMenuItem>
              {isActive && (
                <DropdownMenuItem className="text-xs uppercase font-bold gap-2 text-destructive">Cancel Subscription</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Current Tier</p>
              <p className="text-xs font-bold">{sub.tier}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Monthly Price</p>
              <p className="text-sm font-black text-primary">${sub.price}</p>
            </div>
          </div>

          <div className="p-3 bg-background/50 rounded-2xl border border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] uppercase font-bold text-muted-foreground/80 tracking-widest">
                {isActive ? 'Next Billing' : 'Expired on'}
              </span>
            </div>
            <span className="text-[10px] font-black tabular-nums">{sub.nextBilling}</span>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          {isActive ? (
            <Button className="w-full rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground border border-border/50 text-[10px] font-black uppercase tracking-[0.2em] h-10 gap-2">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              Manage Access
            </Button>
          ) : (
            <Button className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase tracking-[0.2em] h-10 gap-2 shadow-lg shadow-primary/20">
              <Clock className="h-3 w-3" />
              Resubscribe
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
