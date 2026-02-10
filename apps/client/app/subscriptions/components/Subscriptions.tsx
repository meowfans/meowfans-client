'use client';

import { Button } from '@workspace/ui/components/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Settings2 } from 'lucide-react';
import { Subscription, SubscriptionCard } from './SubscriptionCard';
import { SubscriptionsHeader } from './SubscriptionsHeader';

const MOCK_SUBSCRIPTIONS: Subscription[] = [
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

export function Subscriptions() {
  const activeSubs = MOCK_SUBSCRIPTIONS.filter((s) => s.status === 'active');
  const expiredSubs = MOCK_SUBSCRIPTIONS.filter((s) => s.status === 'expired');

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8 pt-0 max-w-7xl mx-auto w-full">
      <SubscriptionsHeader />

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
