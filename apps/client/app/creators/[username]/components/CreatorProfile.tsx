'use client';

import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { CreatorContext } from '@/hooks/context/CreatorContextWrapper';
import { CreatorType } from '@workspace/gql/generated/graphql';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { CreatorProfileHeader } from './CreatorProfileHeader';
import { CreatorProfilePosts } from './CreatorProfilePosts';
import { CreatorProfileSkeleton } from './CreatorProfileSkeleton';
import { CreatorProfileVaults } from './CreatorProfileVaults';

type TabProps = 'gallery' | 'vaults' | 'about' | 'posts';

export const CreatorProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [creator] = useContext(CreatorContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<TabProps>(() => {
    const paramTab = searchParams.get('tab') as TabProps | null;
    if (paramTab) return paramTab;
    return creator?.creatorType.includes(CreatorType.NewUser) ? 'posts' : 'vaults';
  });

  const handleTabChange = (tab: TabProps) => {
    const params = new URLSearchParams(String(searchParams));
    params.set('tab', tab);
    router.push(`?${String(params)}`, { scroll: false });
    setCurrentTab(tab);
  };
  useEffect(() => {
    if (creator) setLoading(false);
  }, [creator]);

  return loading ? (
    <CreatorProfileSkeleton />
  ) : (
    <PageManager>
      <Tabs value={currentTab} onValueChange={(val) => handleTabChange(val as TabProps)}>
        <TabsContent value="posts">
          <CreatorProfilePosts username={creator.user.username} />
        </TabsContent>

        <TabsContent value="vaults">
          <CreatorProfileVaults username={creator.user.username} />
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <CreatorProfileHeader />
          <TabsList>
            <TabsTrigger value={'posts'}>Posts</TabsTrigger>
            <TabsTrigger value={'vaults'}>Vaults</TabsTrigger>
            <TabsTrigger value={'about'}>About</TabsTrigger>
          </TabsList>
          <ExoAdProvider zoneId="5770612" zoneType={ExoAdZoneTypes.Gallery} />
          <p>This is the about section. Creator bio, socials, and more background details here.</p>
        </TabsContent>
      </Tabs>
    </PageManager>
  );
};
