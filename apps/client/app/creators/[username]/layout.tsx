import { CreatorContextWrapper } from '@/hooks/context/CreatorContextWrapper';
import { configService } from '@/util/config';
import { GET_PUBLIC_CREATOR_PROFILE_QUERY } from '@workspace/gql/api/creatorAPI';
import { createApolloClient } from '@workspace/gql/ApolloClient';
import { CreatorProfilesEntity } from '@workspace/gql/generated/graphql';

interface Props {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}

export default async function CreatorProfileLayout({ children, params }: Props) {
  const { getClient } = createApolloClient(configService.NEXT_PUBLIC_API_GRAPHQL_URL);
  const client = await getClient();
  const { data } = await client.query({
    query: GET_PUBLIC_CREATOR_PROFILE_QUERY,
    variables: { input: { username: (await params).username } }
  });
  const creator = data?.getPublicCreatorProfile as CreatorProfilesEntity;

  return <CreatorContextWrapper creator={creator}>{children}</CreatorContextWrapper>;
}
