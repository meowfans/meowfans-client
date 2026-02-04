import { configService } from '@/util/config';
import { ApolloWrapper } from '@workspace/gql/ApolloWrapper';

interface AuthV2LayoutProps {
  children: React.ReactNode;
}

export default function AuthV2Layout({ children }: AuthV2LayoutProps) {
  return (
    <ApolloWrapper apiGraphqlUrl={configService.NEXT_PUBLIC_API_GRAPHQL_URL}>
      <main className="w-full">{children}</main>
    </ApolloWrapper>
  );
}
