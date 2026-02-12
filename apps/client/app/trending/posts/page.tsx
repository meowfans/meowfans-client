import { getPosts } from '@/app/server/getPosts';
import { PostTypes, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { TrendingPosts } from './components/TrendingPosts';

export const metadata = {
  title: 'Trending Posts'
};

export const dynamic = 'force-dynamic';

export default async function TrendingPostsPage() {
  const posts = await getPosts({ sortBy: SortBy.PostCreatedAt, orderBy: SortOrder.Asc, take: 20, postTypes: Object.values(PostTypes) });
  return <TrendingPosts initialPosts={posts} />;
}
