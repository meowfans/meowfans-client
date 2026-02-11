'use client';

import { GetDefaultCreatorsOutput, GetPublicPostsOutput, GetPublicVaultObjectsOutput } from '@workspace/gql/generated/graphql';
import { TrendingCreatorsSection } from './TrendingCreatorsSection';
import { TrendingHero } from './TrendingHero';
import { TrendingPicturesSection } from './TrendingPicturesSection';
import { TrendingPostsSection } from './TrendingPostsSection';

interface TrendingProps {
  initialCreators: GetDefaultCreatorsOutput[];
  initialPosts: GetPublicPostsOutput[];
  initialVaultObjects: GetPublicVaultObjectsOutput[];
}

export function Trending({ initialCreators, initialPosts, initialVaultObjects }: TrendingProps) {
  return (
    <div className="flex flex-1 flex-col gap-12 p-4 md:p-8 pt-0 max-w-7xl mx-auto w-full pb-20">
      <TrendingHero />
      <TrendingCreatorsSection creators={initialCreators} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <TrendingPicturesSection vaultObjects={initialVaultObjects} />
        <TrendingPostsSection posts={initialPosts} />
      </div>
    </div>
  );
}
