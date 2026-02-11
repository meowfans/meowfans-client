'use client';

import { useServerChannels } from '@/hooks/server/useServerChannels';
import { useServerCreators } from '@/hooks/server/useServerCreators';
import { useServerGetFollowings } from '@/hooks/server/useServerGetFollowings';
import { useServerPurchased } from '@/hooks/server/useServerPurchased';
import { ChannelsOutput, GetDefaultCreatorsOutput, GetFanAssetsOutput, GetFollowingOutput } from '@workspace/gql/generated/graphql';
import { useMemo } from 'react';
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
  const { followings } = useServerGetFollowings({ take: 30 }, initialFollowings);
  const { fanAssets, loading: assetsLoading } = useServerPurchased({ take: 5 }, initialFanAssets);
  const { creators, loading: creatorsLoading } = useServerCreators({ take: 10 }, initialCreators);
  const { channels, loading: channelsLoading } = useServerChannels({ take: 5, skip: 0 }, initialChannels);

  const recommendedCreators = useMemo<GetDefaultCreatorsOutput[]>(() => {
    return creators.filter((c) => !followings.some((f) => f.id === c.id)).slice(0, 5);
  }, [creators, followings]);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-background/50 backdrop-blur-3xl p-6 h-screen">
      <DashBoardHeader />
      <div className="py-6">
        <DashboardStats followingLength={followings.length} fanAssetsLength={fanAssets.length} channelsLength={channels.length} />
      </div>

      <div className="grid gap-8 lg:grid-cols-7 items-start">
        <div className="space-y-8 lg:col-span-4">
          <DashboardFanAssets fanAssets={fanAssets} assetsLoading={assetsLoading} />
          <DashboardRecommendCreators creatorsLoading={creatorsLoading} recommendedCreators={recommendedCreators} />
        </div>

        <div className="space-y-8 lg:col-span-3">
          <DashboardChannels channels={channels} channelsLoading={channelsLoading} isEmpty={!channels.length && !channelsLoading} />
          <DashboardInteractions />
        </div>
      </div>
    </div>
  );
}
