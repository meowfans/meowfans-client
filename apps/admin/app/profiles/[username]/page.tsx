import { configService } from '@/util/config';
import { GET_USER_QUERY } from '@workspace/gql/api/userAPI';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GetUserQuery } from '@workspace/gql/generated/graphql';
import CreatorProfile from './components/CreatorProfile';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function CreatorProfilePage({ params }: Props) {
  const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL);
  const client = await getClient();
  const { data } = await client.query({ query: GET_USER_QUERY, variables: { username: (await params).username } });

  return <CreatorProfile creator={data as GetUserQuery} />;
}
