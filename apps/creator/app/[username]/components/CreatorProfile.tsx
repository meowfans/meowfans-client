'use client';

import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useState } from 'react';

import {
  GrowthRateType,
  NewCustomerType,
  PerformanceType,
  ProfileCharts,
  TotalRevenueType,
  growthRateData,
  newCustomersData,
  performancesData,
  totalRevenueData
} from '@/lib/constants';

import { AppliedChart } from './AppliedChart';
import { GrowthRate } from './GrowthRate';
import { NewCustomers } from './NewCustomers';
import { Performances } from './Performances';
import { ProfileDescription } from './ProfileDescription';
import { Overview } from './Overview';
import { TotalRevenue } from './TotalRevenue';

export type ChartDataTypes = NewCustomerType | TotalRevenueType | GrowthRateType | PerformanceType;

const chartConfig: Record<ProfileCharts, ChartDataTypes> = {
  NEW_CUSTOMERS: newCustomersData,
  TOTAL_REVENUE: totalRevenueData,
  GROWTH_RATE: growthRateData,
  PERFORMANCES: performancesData
};

export const CreatorProfile = () => {
  const [chart, setChart] = useState<ProfileCharts>(ProfileCharts.NEW_CUSTOMERS);

  return (
    <PageManager>
      <ScrollArea className="h-full">
        <div className="mx-auto max-w-7xl px-4 py-6 space-y-6 pb-24 md:pb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your creator profile, assets, and insights.</p>
          </div>
          <div className="md:hidden">
            <ProfileDescription />
          </div>

          <div className="hidden md:flex gap-2 justify-between sticky top-20 z-10 bg-background/80 backdrop-blur-md p-2 rounded-xl border border-border/50">
            <NewCustomers setChart={setChart} />
            <TotalRevenue setChart={setChart} />
            <GrowthRate setChart={setChart} />
            <Performances setChart={setChart} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-6">
            <div className="space-y-6">
              <div className="flex md:hidden overflow-x-auto gap-2 pb-2 -mx-4 px-4">
                <NewCustomers setChart={setChart} />
                <TotalRevenue setChart={setChart} />
                <GrowthRate setChart={setChart} />
                <Performances setChart={setChart} />
              </div>

              <AppliedChart data={chartConfig[chart]} />
              <Overview />
            </div>

            <div className="hidden md:block sticky top-28 h-fit">
              <ProfileDescription />
            </div>
          </div>
        </div>
      </ScrollArea>
    </PageManager>
  );
};
