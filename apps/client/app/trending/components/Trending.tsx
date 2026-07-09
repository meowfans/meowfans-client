'use client';

import { GetDefaultCreatorsOutput, GetPublicPostsOutput, GetPublicVaultObjectsOutput } from '@workspace/gql/generated/graphql';
import { TrendingCreatorsSection } from './TrendingCreatorsSection';
import { TrendingHero } from './TrendingHero';
import { TrendingPostsSection } from './TrendingPostsSection';

interface TrendingProps {
  initialCreators: GetDefaultCreatorsOutput[];
  initialPosts: GetPublicPostsOutput[];
  initialVaultObjects: GetPublicVaultObjectsOutput[];
}

export function Trending({ initialCreators, initialPosts, initialVaultObjects }: TrendingProps) {
  return (
    <div className="flex flex-1 flex-col p-2 bg-background/50 backdrop-blur-3xl h-screen gap-3">
      <TrendingHero />
      <TrendingCreatorsSection creators={initialCreators} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <TrendingPostsSection posts={initialPosts} />
      </div>
    </div>
  );
}
