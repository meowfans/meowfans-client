import { ROUTE_METADATA } from '@/lib/metadata-config';
import { PostTypes, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { getPosts } from '../server/getPosts';
import { Posts } from './components/Posts';

export const metadata: Metadata = {
  ...ROUTE_METADATA.posts
};

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const posts = await getPosts({ sortBy: SortBy.PostCreatedAt, orderBy: SortOrder.Desc, take: 20, postTypes: Object.values(PostTypes) });
  return <Posts initialPosts={posts} />;
}
