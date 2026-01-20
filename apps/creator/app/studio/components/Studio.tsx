'use client';

import { usePosts } from '@/hooks/usePosts';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
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
  const { loading, posts } = usePosts({ take: 30, orderBy: SortOrder.Desc, sortBy: SortBy.PostViewCount });

  return (
    <PageManager>
      <div className="relative">
        <div className="px-4 py-6 pb-24">
          <StudioHeader />
          <Separator className="my-6" />
          <PostDetails loading={loading} posts={posts} />
          <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
            <PostAnalytics chartType={chartType} loading={loading} posts={posts} setChartType={setChartType} />
            <RecentPosts loading={loading} posts={posts} />
          </div>
        </div>
      </div>
    </PageManager>
  );
};
