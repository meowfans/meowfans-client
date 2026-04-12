'use client';

import { ChannelsOutput, GetDefaultCreatorsOutput, GetFanAssetsOutput, GetFollowingOutput } from '@workspace/gql/generated/graphql';
import { DashboardChannels } from './DashboardChannels';
import { DashboardFanAssets } from './DashboardFanAssets';
import { DashBoardHeader } from './DashboardHeader';
import { DashboardInteractions } from './DashboardInteractions';
import { DashboardRecommendCreators } from './DashboardRecommendCreators';
import { DashboardStats } from './DashboardStats';

interface DashboardProps {
  initialFollowings: GetFollowingOutput[];
  initialFanAssets: GetFanAssetsOutput[];
  initialCreators: GetDefaultCreatorsOutput[];
  initialChannels: ChannelsOutput[];
}

export function Dashboard({ initialFollowings, initialFanAssets, initialCreators, initialChannels }: DashboardProps) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-background/50 backdrop-blur-3xl p-6 h-screen">
      <DashBoardHeader />
      <div className="py-6">
        <DashboardStats
          followingLength={initialFollowings.length}
          fanAssetsLength={initialFanAssets.length}
          channelsLength={initialChannels.length}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-7 items-start">
        <div className="space-y-8 lg:col-span-4">
          <DashboardFanAssets fanAssets={initialFanAssets} assetsLoading={false} />
          <DashboardRecommendCreators creatorsLoading={false} recommendedCreators={initialCreators} />
        </div>

        <div className="space-y-8 lg:col-span-3">
          <DashboardChannels channels={initialChannels} channelsLoading={false} isEmpty={!initialChannels.length && !false} />
          <DashboardInteractions />
        </div>
      </div>
    </div>
  );
}
