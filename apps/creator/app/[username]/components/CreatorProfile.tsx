'use client';

import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useState } from 'react';

import {
  interactionData,
  InteractionType,
  newCustomersData,
  NewFollowersType,
  ProfileCharts,
  totalRevenueData,
  TotalRevenueType,
  viewRateData,
  ViewRateType
} from '@/lib/constants';

import { AppliedChart } from './AppliedChart';
import { Overview } from './Overview';
import { ProfileDescription } from './ProfileDescription';
import { TotalRevenue } from './TotalRevenue';
import { NewFollowers } from './NewFollowers';
import { ViewRate } from './ViewRate';
import { Interaction } from './Performances';

export type ChartDataTypes = NewFollowersType | TotalRevenueType | ViewRateType | InteractionType;

const chartConfig: Record<ProfileCharts, ChartDataTypes> = {
  NewFollowers: newCustomersData,
  TotalRevenue: totalRevenueData,
  ViewRate: viewRateData,
  Interaction: interactionData
};

export const CreatorProfile = () => {
  const [chart, setChart] = useState<ProfileCharts>(ProfileCharts.NewFollowers);

  return (
    <PageManager>
      <ScrollArea className="h-full">
        <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-6 space-y-6 pb-24 md:pb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your creator profile, assets, and insights.</p>
          </div>

          <div className="lg:hidden">
            <ProfileDescription />
          </div>

          <div className="hidden lg:flex gap-2 justify-between sticky top-20 z-10 bg-background/80 backdrop-blur-md p-2 rounded-xl border border-border/50">
            <NewFollowers setChart={setChart} />
            <TotalRevenue setChart={setChart} />
            <ViewRate setChart={setChart} />
            <Interaction setChart={setChart} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            <div className="space-y-6">
              <div
                className="
                  lg:hidden
                  flex flex-col gap-2
                  sm:grid sm:grid-cols-2
                  md:flex md:flex-row md:flex-wrap md:gap-2
                "
              >
                <NewFollowers setChart={setChart} />
                <TotalRevenue setChart={setChart} />
                <ViewRate setChart={setChart} />
                <Interaction setChart={setChart} />
              </div>

              <AppliedChart data={chartConfig[chart]} />
              <Overview />
            </div>

            <div className="hidden lg:block sticky top-28 h-fit">
              <ProfileDescription />
            </div>
          </div>
        </div>
      </ScrollArea>
    </PageManager>
  );
};
