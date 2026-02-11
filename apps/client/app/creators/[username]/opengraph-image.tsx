import { configService } from '@/util/config';
import { GET_PUBLIC_CREATOR_PROFILE_QUERY } from '@workspace/gql/api';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { UserRoles } from '@workspace/gql/generated/graphql';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Creator Profile';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const client = await createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan).getClient();
  const { data } = await client.query({ query: GET_PUBLIC_CREATOR_PROFILE_QUERY, variables: { username } });

  const profile = data?.getPublicCreatorProfile;
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
      }}
    >
      {profile?.avatarUrl && (
        <img src={profile.avatarUrl} alt={profile.fullName} width={200} height={200} style={{ borderRadius: '50%' }} />
      )}
    </div>,
    { ...size }
  );
}
