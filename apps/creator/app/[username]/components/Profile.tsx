'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { ActionItems } from './ActionItems';
import { AnalyticsOverview } from './AnalyticsOverview';
import { ProfileHeader } from './ProfileHeader';
import { StatsCards } from './StatsCards';

export function Profile() {
  const { creator } = useCreator();
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Profile</h2>
      </div>

      <ProfileHeader />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <StatsCards
            totalRevenue={45231.89}
            totalFollowers={creator.followersCount}
            totalPosts={creator.totalPost}
            activeVaults={creator.vaultCount ?? 0}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <AnalyticsOverview payments={creator.payments} />
            <ActionItems />
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <AnalyticsOverview payments={creator.payments} />
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <CardDescription>Your posts with the most engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-sm">No data available yet.</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
