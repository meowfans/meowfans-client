import PostContextWrapper from '@/hooks/context/PostContextWrapper';
import { configService } from '@/util/config';
import { GET_PUBLIC_POST_BY_ID_FOR_ANON_QUERY, GET_PUBLIC_POST_BY_ID_QUERY } from '@workspace/gql/api/postsAPI';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { PostsEntity } from '@workspace/gql/generated/graphql';
import { authCookieKey } from '@workspace/ui/lib';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const fetchPost = async (params: Promise<{ id: string }>) => {
  const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL);
  const client = await getClient();
  const { data } = await client.query({ query: GET_PUBLIC_POST_BY_ID_FOR_ANON_QUERY, variables: { input: { postId: (await params).id } } });
  return data?.getPublicPostByIdForAnon as PostsEntity;
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
  const accessToken = (await cookies()).get(authCookieKey)?.value;
  let post: PostsEntity;
  if (accessToken) {
    const { data } = await client.query({
      query: GET_PUBLIC_POST_BY_ID_QUERY,
      variables: { input: { postId: (await params).id } }
    });
    post = data?.getPublicPostById as PostsEntity;
  } else {
    post = (await fetchPost(params)) as PostsEntity;
  }

  return <PostContextWrapper post={post}>{children}</PostContextWrapper>;
}
