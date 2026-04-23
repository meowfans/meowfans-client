'use client';

import { PageHandler } from '@/components/PageHandler';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { GetPublicCreatorProfileOutput, GetPublicPostsOutput, GetPublicVaultsOutput } from '@workspace/gql/generated/graphql';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Grid3x3, Lock } from 'lucide-react';
import { TabProps } from './SingleCreatorProfile';
import { SingleProfilePosts } from './SingleProfilePosts';
import { SingleProfileVaults } from './SingleProfileVaults';

interface SingleCreatorProfileTabsProps {
  profile: GetPublicCreatorProfileOutput;
  onTabChange: (tab: TabProps) => void;
  currentTab: TabProps;
  initialPosts: GetPublicPostsOutput[];
  initialVaults: GetPublicVaultsOutput[];
}

export const SingleCreatorProfileTabs = ({
  profile,
  onTabChange,
  currentTab,
  initialPosts,
  initialVaults
}: SingleCreatorProfileTabsProps) => {
  const tabs = [
    { id: 'posts', label: 'POSTS', icon: Grid3x3 },
    { id: 'vaults', label: 'VAULTS', icon: Lock }
  ];

  return (
    <div className="flex-1 w-full bg-transparent max-w-4xl mx-auto">
      <PageHandler
        isEmpty={currentTab === 'posts' ? !initialPosts.length : currentTab === 'vaults' ? !initialVaults.length : true}
        isLoading={false}
        path={currentTab === 'posts' ? APP_PATHS.POSTS : APP_PATHS.VAULTS}
      >
        <Tabs defaultValue={currentTab} className="space-y-4">
          <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="vaults">Vaults</TabsTrigger>
          </TabsList>
          <div className="w-full">
            <SingleProfilePosts profile={profile} initialPosts={initialPosts} />
            <SingleProfileVaults profile={profile} initialVaults={initialVaults} />
          </div>
        </Tabs>
      </PageHandler>
    </div>
  );
};
