import { getPublicCreatorPosts } from '@/app/server/getPublicCreatorPosts';
import { GetPublicPostsOutput, PostTypes, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { PostsView } from './components/PostsView';

interface PostsPageProps {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: PostsPageProps): Promise<Metadata> {
  const { userId } = await params;
  return {
    title: `Posts by @${userId}`,
    description: `View all posts from ${userId} on MeowFans.`
  };
}

export default async function Page({ params }: PostsPageProps) {
  const { userId } = await params;
  const posts = await getPublicCreatorPosts({
    sortBy: SortBy.PostCreatedAt,
    relatedUserId: userId,
    orderBy: SortOrder.Desc,
    take: 20,
    postTypes: Object.values(PostTypes)
  });

  return <PostsView userId={userId} initialPosts={posts as GetPublicPostsOutput[]} />;
}
