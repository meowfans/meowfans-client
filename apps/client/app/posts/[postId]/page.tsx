import { SinglePost } from './components/SinglePost';

export default function SinglePostPage() {
  return <SinglePost />;
}

// interface Props {
//   children: React.ReactNode;
//   params: Promise<{ id: string }>;
// }

// const fetchPost = async (params: Promise<{ id: string }>) => {
//   const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL);
//   const client = await getClient();
//   const { data } = await client.query({ query: GET_PUBLIC_POST_BY_ID_QUERY, variables: { input: { postId: (await params).id } } });
//   return data?.getPublicPostById as PostsEntity;
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const post = await fetchPost(params);
//   return {
//     title: post?.creatorProfile.user.username,
//     description: post.caption ?? '',
//     openGraph: {
//       title: post.creatorProfile.user.username,
//       description: post.caption ?? '',
//       images: [{ url: post.preview }]
//     }
//   };
// }
