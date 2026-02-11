import { getPosts } from '@/app/server/getPosts';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { TrendingPosts } from './components/TrendingPosts';

export const metadata = {
  title: 'Trending Posts'
};

export const dynamic = 'force-dynamic';

export default async function TrendingPostsPage() {
  const posts = await getPosts({ sortBy: SortBy.PostCreatedAt, orderBy: SortOrder.Desc, take: 20 });
  return <TrendingPosts initialPosts={posts} />;
}
