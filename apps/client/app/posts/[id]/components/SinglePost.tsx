'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CommentsStack } from './CommentsStack';
import { PostGallery } from './PostGallery';
import { PostInfoSection } from './PostInfo';
import { SinglePostHeader } from './SinglePostHeader';

type TabProps = 'post' | 'comments' | 'about';

export const SinglePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TabProps>((searchParams.get('tab') as TabProps) || 'post');

  const handleTabChange = (tab: TabProps) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`?${params.toString()}`, { scroll: false });
    setCurrentTab(tab);
  };

  return (
    <PageManager>
      <SinglePostHeader expanded={expanded} onExpanded={setExpanded} />
      <Tabs defaultValue={currentTab} onValueChange={(val) => handleTabChange(val as TabProps)}>
        <TabsList>
          <TabsTrigger value={'post'}>Post</TabsTrigger>
          <TabsTrigger value={'comments'}>Comments</TabsTrigger>
          <TabsTrigger value={'about'}>About</TabsTrigger>
        </TabsList>
        <TabsContent value="post" className="mt-3">
          <PostGallery />
        </TabsContent>

        <TabsContent value="comments" className="mt-6 text-center text-gray-500">
          <CommentsStack />
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <PostInfoSection />
        </TabsContent>
      </Tabs>
    </PageManager>
  );
};
