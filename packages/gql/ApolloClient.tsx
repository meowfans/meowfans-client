import { authCookieKey } from "@workspace/ui/lib";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const createApolloClient = (apiGraphqlUrl: string) => {
  return registerApolloClient(async () => {
    const token = await getCookie(authCookieKey, { cookies });

    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext((headers = {}) => {
        return {
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
        };
      });
      return forward(operation);
    });

    const httpLink = new HttpLink({
      uri: apiGraphqlUrl,
    });

    return new ApolloClient({
      link: ApolloLink.from([authLink, httpLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: { fetchPolicy: "no-cache", errorPolicy: "all" },
        mutate: { fetchPolicy: "no-cache", errorPolicy: "all" },
        watchQuery: { fetchPolicy: "no-cache", errorPolicy: "all" },
      },
    });
  });
};
