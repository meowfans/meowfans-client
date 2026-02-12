'use client';

import { PageHandler } from '@/components/PageHandler';
import { GetPublicCreatorProfileOutput, GetPublicPostsOutput, GetPublicVaultsOutput } from '@workspace/gql/generated/graphql';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CreatorProfileHeader } from './CreatorProfileHeader';
import { SingleCreatorProfileTabs } from './SingleCreatorProfileTabs';

interface SingleCreatorProfileProps {
  profile: GetPublicCreatorProfileOutput;
  initialPosts: GetPublicPostsOutput[];
  initialVaults: GetPublicVaultsOutput[];
}

export type TabProps = 'pictures' | 'vaults' | 'posts';

export function SingleCreatorProfile({ profile, initialPosts, initialVaults }: SingleCreatorProfileProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);

  const [currentTab, setCurrentTab] = useState<TabProps>(() => {
    const paramTab = searchParams.get('tab') as TabProps | null;
    if (paramTab) return paramTab;
    return profile?.isImported ? 'vaults' : 'posts';
  });

  const handleTabChange = (tab: TabProps) => {
    const params = new URLSearchParams(String(searchParams));
    params.set('tab', tab);
    router.push(`?${String(params)}`, { scroll: false });
    setCurrentTab(tab);
  };

  useEffect(() => {
    if (profile) setLoading(false);
  }, [profile]);

  return (
    <PageHandler isEmpty={!profile} isLoading={loading && !profile}>
      <div className="flex min-h-screen flex-col bg-black text-white">
        <CreatorProfileHeader profile={profile} />
        <SingleCreatorProfileTabs
          profile={profile}
          onTabChange={handleTabChange}
          currentTab={currentTab}
          initialPosts={initialPosts}
          initialVaults={initialVaults}
        />
      </div>
    </PageHandler>
  );
}
