'use client';

import Loading from '@/app/loading';
import { GrowthRateType, NewCustomerType, PerformanceType, ProfileCharts, TotalRevenueType } from '@/lib/constants';
import { useQuery } from '@apollo/client/react';
import { GET_CREATOR_PROFILE_QUERY_BY_ADMIN } from '@workspace/gql/api/creatorAPI';
import { GetCreatorProfileByAdminQuery, GetUserQuery } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useState } from 'react';
import { ProfileDescription } from './ProfileDescription';
import { Stats } from './Stats';
import { Preferences } from './Tabs';

export type ChartDataTypes = NewCustomerType | TotalRevenueType | GrowthRateType | PerformanceType;

interface Props {
  creator: GetUserQuery;
}

const CreatorProfile: React.FC<Props> = ({ creator }) => {
  const { data: creatorInfo, loading } = useQuery(GET_CREATOR_PROFILE_QUERY_BY_ADMIN, { variables: { creatorId: creator?.getUser.id } });
  const [chart, setChart] = useState<ProfileCharts>(ProfileCharts.NEW_CUSTOMERS);

  if (loading) return <Loading />;
  return (
    <PageManager>
      <ScrollArea className="flex w-full">
        <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto">
          <div className="flex flex-row justify-between">
            <ProfileDescription creatorInfo={creatorInfo} />
          </div>
          <Stats creatorInfo={creatorInfo as GetCreatorProfileByAdminQuery} />
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
