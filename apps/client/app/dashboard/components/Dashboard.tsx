'use client';

import { useChannels } from '@/hooks/useChannels';
import { useCreators } from '@/hooks/useCreators';
import { useFanAssets } from '@/hooks/useFanAssets';
import { useFollowings } from '@/hooks/useFollow';
import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
import { Loading } from '@workspace/ui/globals/Loading';
import { useMemo } from 'react';
import { DashboardChannels } from './DashboardChannels';
import { DashboardFanAssets } from './DashboardFanAssets';
import { DashBoardHeader } from './DashboardHeader';
import { DashboardInteractions } from './DashboardInteractions';
import { DashboardRecommendCreators } from './DashboardRecommendCreators';
import { DashboardStats } from './DashboardStats';

export function Dashboard() {
  const { followings, loading: followingsLoading } = useFollowings();
  const { fanAssets, loading: assetsLoading } = useFanAssets({ take: 5 });
  const { creators: allCreators, loading: creatorsLoading } = useCreators({ take: 10 });
  const { channels, loading: channelsLoading, isEmpty } = useChannels({ take: 5, skip: 0 });

  const recommendedCreators = useMemo<GetDefaultCreatorsOutput[]>(() => {
    return allCreators.filter((c) => !followings.some((f) => f.id === c.id)).slice(0, 5);
  }, [allCreators, followings]);

  if (followingsLoading && followings.length === 0) {
    return <Loading />;
  }

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
          <DashboardChannels channels={channels} channelsLoading={channelsLoading} isEmpty={!!isEmpty} />
          <DashboardInteractions />
        </div>
      </div>
    </div>
  );
}
