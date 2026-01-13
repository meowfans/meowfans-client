'use client';

import { usePostsInfo } from '@/hooks/usePosts';
import { Separator } from '@workspace/ui/components/separator';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { ShadCnChartTypes } from '@workspace/ui/lib/enums';
import { useState } from 'react';
import { PostAnalytics } from './PostAnalytics';
import { PostDetails } from './PostDetails';
import { RecentPosts } from './RecentPosts';
import { StudioHeader } from './StudioHeader';

export const Studio = () => {
  const [chartType, setChartType] = useState<ShadCnChartTypes>(ShadCnChartTypes.AREA_CHART);
  const { loading, postsInfo } = usePostsInfo({ take: 30 });

  return (
    <PageManager>
      <div className="relative">
        <div className="px-4 py-6 pb-24">
          <StudioHeader />
          <Separator className="my-6" />
          <PostDetails loading={loading} postsInfo={postsInfo} />
          <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
            <PostAnalytics chartType={chartType} loading={loading} postsInfo={postsInfo} setChartType={setChartType} />
            <RecentPosts loading={loading} postsInfo={postsInfo} />
          </div>
        </div>
      </div>
    </PageManager>
  );
};
