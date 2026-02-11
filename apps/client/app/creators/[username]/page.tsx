import { ROUTE_METADATA } from '@/lib/metadata-config';
import { configService } from '@/util/config';
import { GET_PUBLIC_CREATOR_PROFILE_QUERY } from '@workspace/gql/api';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { GetPublicCreatorProfileOutput, UserRoles } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { SingleCreatorProfile } from './components/SingleCreatorProfile';

export async function generateMetadata({ params }: SingleCreatorProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  try {
    const client = await createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL, UserRoles.Fan).getClient();
    const { data } = await client.query({ query: GET_PUBLIC_CREATOR_PROFILE_QUERY, variables: { username } });
    const profile = data?.getPublicCreatorProfile as GetPublicCreatorProfileOutput;

    if (!profile) return { title: ROUTE_METADATA.creators.title };

    return {
      title: `${profile.fullName} (@${username})`,
      description: profile.bio || `View ${profile.fullName}'s exclusive content and posts on MeowFans.`,
      openGraph: {
        images: [profile.avatarUrl || '']
      }
    };
  } catch {
    return { title: ROUTE_METADATA.creators.title };
  }
}

export const dynamic = 'force-dynamic';

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
