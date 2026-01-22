'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import { ApolloClient, ApolloNextAppProvider, InMemoryCache } from '@apollo/client-integration-nextjs';
import { BearerAccessToken } from '@workspace/ui/lib';
import { UserRoles } from './generated/graphql';

interface ApolloWrapperProps {
  apiGraphqlUrl: string;
  children: React.ReactNode;
  role?: UserRoles;
}

export function ApolloWrapper({ apiGraphqlUrl, children, role = UserRoles.Fan }: ApolloWrapperProps) {
  function makeClient() {
    const httpLink = new HttpLink({
      uri: apiGraphqlUrl,
      fetchOptions: { cache: 'no-cache' }
    });

    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext((headers = {}) => ({
        headers: {
          ...headers,
          Authorization: BearerAccessToken(role)
        }
      }));
      return forward(operation);
    });

    return new ApolloClient({
      link: ApolloLink.from([authLink, httpLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: { fetchPolicy: 'no-cache', errorPolicy: 'all' },
        mutate: { fetchPolicy: 'no-cache', errorPolicy: 'all' },
        watchQuery: { fetchPolicy: 'no-cache', errorPolicy: 'all' }
      }
    });
  }

  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
