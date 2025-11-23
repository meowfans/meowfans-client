import { CreatorContextWrapper } from '@/hooks/context/CreatorContextWrapper';
import { configService } from '@/util/config';
import { GET_PUBLIC_CREATOR_PROFILE_FOR_ANON_QUERY, GET_PUBLIC_CREATOR_PROFILE_QUERY } from '@workspace/gql/api/creatorAPI';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { CreatorProfilesEntity } from '@workspace/gql/generated/graphql';
import { authCookieKey } from '@workspace/ui/lib';
import { cookies } from 'next/headers';

interface Props {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}

export default async function CreatorProfileLayout({ children, params }: Props) {
  const authCookie = (await cookies()).get(authCookieKey)?.value;
  const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL);
  const client = await getClient();
  let creator: CreatorProfilesEntity;
  if (authCookie) {
    const { data } = await client.query({
      query: GET_PUBLIC_CREATOR_PROFILE_QUERY,
      variables: { input: { username: (await params).username } }
    });
    creator = data?.getPublicCreatorProfile as CreatorProfilesEntity;
  } else {
    const { data } = await client.query({
      query: GET_PUBLIC_CREATOR_PROFILE_FOR_ANON_QUERY,
      variables: { input: { username: (await params).username } }
    });
    creator = data?.getPublicCreatorProfileForAnon as CreatorProfilesEntity;
  }

  return <CreatorContextWrapper creator={creator}>{children}</CreatorContextWrapper>;
}
