'use client';

import { useCreators } from '@/hooks/useCreators';
import { usePosts } from '@/hooks/usePosts';
import { useVaultObjects } from '@/hooks/useVaultObjects';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Loading } from '@workspace/ui/globals/Loading';
import { TrendingCreatorsSection } from './TrendingCreatorsSection';
import { TrendingHero } from './TrendingHero';
import { TrendingPicturesSection } from './TrendingPicturesSection';
import { TrendingPostsSection } from './TrendingPostsSection';

export function Trending() {
  const { creators, loading: loadingCreators } = useCreators({
    take: 6,
    sortBy: SortBy.AssetCount,
    orderBy: SortOrder.Desc
  });

  const { posts, loading: loadingPosts } = usePosts({
    take: 4,
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Desc
  });

  const { vaultObjects, loading: loadingPictures } = useVaultObjects({
    take: 4,
    sortBy: SortBy.VaultObjectLikeCount,
    orderBy: SortOrder.Desc
  });

  const isLoading = loadingCreators || loadingPosts || loadingPictures;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-vh-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Analyzing Trends</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-12 p-4 md:p-8 pt-0 max-w-7xl mx-auto w-full pb-20">
      <TrendingHero />
      <TrendingCreatorsSection creators={creators} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <TrendingPicturesSection vaultObjects={vaultObjects} />
        <TrendingPostsSection posts={posts} />
      </div>
    </div>
  );
}
