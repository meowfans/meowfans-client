import { configService } from '@/util/config';
import { GET_PUBLIC_CREATOR_PROFILE_QUERY } from '@workspace/gql/api';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GetPublicCreatorProfileOutput, UserRoles } from '@workspace/gql/generated/graphql';
import { SingleCreatorProfile } from './components/SingleCreatorProfile';

export const metadata = {
  title: 'Creator Profile'
};

interface SingleCreatorProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function SingleCreatorProfilePage({ params }: SingleCreatorProfilePageProps) {
  const { username } = await params;
  const client = await createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan).getClient();
  const { data } = await client.query({ query: GET_PUBLIC_CREATOR_PROFILE_QUERY, variables: { username } });
  const profile = data?.getPublicCreatorProfile as GetPublicCreatorProfileOutput;
  return <SingleCreatorProfile username={username} profile={profile} />;
}
