'use client';

import { GetPublicCreatorProfileOutput } from '@workspace/gql/generated/graphql';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Grid3x3, Image as ImageIcon, Lock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CreatorProfileHeader } from './CreatorProfileHeader';
import { PicturesTab } from './PicturesTab';
import { PostsTab } from './PostsTab';
import { VaultsTab } from './VaultsTab';

interface CreatorProfileViewProps {
  username: string;
  profile: GetPublicCreatorProfileOutput;
}

type TabProps = 'pictures' | 'vaults' | 'posts';

export function CreatorProfileView({ username, profile }: CreatorProfileViewProps) {
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
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="flex-none">
        <CreatorProfileHeader profile={profile} loading={loading} />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs value={currentTab} onValueChange={(val) => handleTabChange(val as TabProps)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts" className="gap-2">
              <Grid3x3 className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="pictures" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Pictures
            </TabsTrigger>
            <TabsTrigger value="vaults" className="gap-2">
              <Lock className="h-4 w-4" />
              Vaults
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <PostsTab username={username} />
          </TabsContent>

          <TabsContent value="pictures" className="mt-6">
            <PicturesTab username={username} />
          </TabsContent>

          <TabsContent value="vaults" className="mt-6">
            <VaultsTab username={username} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
