import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { headers } from 'next/headers';

export const { getClient } = registerApolloClient(() => {
  // Local GraphQL server API Link
  const localLink = new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
    credentials: 'same-origin',
  });

  headers();
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: localLink,
  });
});
