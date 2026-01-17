import PostContextWrapper from '@/hooks/context/PostContextWrapper';
import { configService } from '@/util/config';
import { GET_PUBLIC_POST_BY_ID_QUERY } from '@workspace/gql/api/postsAPI';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { PostsEntity } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const fetchPost = async (params: Promise<{ id: string }>) => {
  const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL);
  const client = await getClient();
  const { data } = await client.query({ query: GET_PUBLIC_POST_BY_ID_QUERY, variables: { input: { postId: (await params).id } } });
  return data?.getPublicPostById as PostsEntity;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params);
  return {
    title: post.creatorProfile.user.username,
    description: post.caption ?? '',
    openGraph: {
      title: post.creatorProfile.user.username,
      description: post.caption ?? '',
      images: [{ url: post.preview }]
    }
  };
}

export default async function SinglePostLayout({ children, params }: Props) {
  const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL);
  const client = await getClient();
  const { data } = await client.query({
    query: GET_PUBLIC_POST_BY_ID_QUERY,
    variables: { input: { postId: (await params).id } }
  });
  const post = data?.getPublicPostById as PostsEntity;

  return <PostContextWrapper post={post}>{children}</PostContextWrapper>;
}
