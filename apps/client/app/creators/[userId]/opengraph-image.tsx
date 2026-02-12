import { configService } from '@/util/config';
import { GET_PUBLIC_CREATOR_PROFILE_QUERY } from '@workspace/gql/api';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { UserRoles } from '@workspace/gql/generated/graphql';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Creator Profile';

export const size = {
  width: 1024,
  height: 1024
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  const client = await createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan).getClient();
  const { data } = await client.query({ query: GET_PUBLIC_CREATOR_PROFILE_QUERY, variables: { input: { userId } } });

  const profile = data?.getPublicCreatorProfile;
  return new ImageResponse(<img src={profile?.avatarUrl} alt={profile?.fullName} width={1024} height={1024} />, { ...size });
}
