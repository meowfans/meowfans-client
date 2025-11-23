'use client';

import { Performances } from '@/app/profile/components/ActiveAccounts';
import { GrowthRate } from '@/app/profile/components/GrowthRate';
import { NewCustomers } from '@/app/profile/components/NewCustomers';
import { TotalRevenue } from '@/app/profile/components/TotalRevenue';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { Separator } from '@workspace/ui/components/separator';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { AnalyticsEarnings } from './Earnings';
import { AnalyticsHeader } from './Header';
import { AnalyticsMessages } from './Messages';
import { AnalyticsPosts } from './Posts';
import { AnalyticsPurchases } from './Purchases';
import { AnalyticsVisitor } from './Visitors';

export const Analytics = () => {
  return (
    <PageManager>
      <AnalyticsHeader />
      <Separator />
      <ScrollArea className="flex w-full">
        <div className="flex md:hidden flex-col md:flex-row p-1 justify-between w-full space-x-3 space-y-1">
          <NewCustomers setChart={() => null} />
          <TotalRevenue setChart={() => null} />
          <GrowthRate setChart={() => null} />
          <Performances setChart={() => null} />
        </div>
        <div className="w-full flex flex-col space-x-1 p-1">
          <AnalyticsEarnings />
          <AnalyticsVisitor />
        </div>
        <div className="flex flex-col p-1 md:flex-row justify-around space-y-1 w-full">
          <AnalyticsPurchases />
          <AnalyticsPosts />
        </div>
        <div className="p-1">
          <AnalyticsMessages />
        </div>
      </ScrollArea>
    </PageManager>
  );
};
