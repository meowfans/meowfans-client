'use client';

import { Button } from '@workspace/ui/components/button';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import {
  growthRateData,
  GrowthRateType,
  newCustomersData,
  NewCustomerType,
  performancesData,
  PerformanceType,
  ProfileCharts,
  totalRevenueData,
  TotalRevenueType
} from '@/lib/constants';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useState } from 'react';
import { Performances } from './ActiveAccounts';
import { AppliedChart } from './AppliedChart';
import { GrowthRate } from './GrowthRate';
import { NewCustomers } from './NewCustomers';
import { ProfileDescription } from './ProfileDescription';
import { Stats } from './Stats';
import { Preferences } from './Tabs';
import { TotalRevenue } from './TotalRevenue';

const chartConfig: Record<ProfileCharts, ChartDataTypes> = {
  NEW_CUSTOMERS: newCustomersData,
  GROWTH_RATE: growthRateData,
  PERFORMANCES: performancesData,
  TOTAL_REVENUE: totalRevenueData
};

export type ChartDataTypes = NewCustomerType | TotalRevenueType | GrowthRateType | PerformanceType;

const CreatorProfile = () => {
  const [chart, setChart] = useState<ProfileCharts>(ProfileCharts.NEW_CUSTOMERS);

  return (
    <PageManager>
      <ScrollArea className="flex w-full">
        <div className="md:flex hidden flex-col md:flex-row gap-1 justify-between">
          <NewCustomers setChart={setChart} />
          <TotalRevenue setChart={setChart} />
          <GrowthRate setChart={setChart} />
          <Performances setChart={setChart} />
        </div>
        <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto">
          <div className="flex flex-row justify-between">
            <AppliedChart data={chartConfig[chart]} />
            <ProfileDescription />
          </div>
          <Stats />
          <Preferences />
          <div className="flex gap-3 justify-center">
            <Button className="flex-1">Follow</Button>
            <Button variant="outline" className="flex-1">
              Message
            </Button>
          </div>
        </div>
      </ScrollArea>
    </PageManager>
  );
};

export default CreatorProfile;
