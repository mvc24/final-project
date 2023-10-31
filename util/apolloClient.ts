import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { headers } from 'next/headers';

export const { getClient } = registerApolloClient(() => {
  // GitHub GraphQL API Link
  // const gitHubLink = new HttpLink({
  //   // this needs to be an absolute url, as relative urls cannot be used in SSR
  //   uri: 'https://api.github.com/graphql',
  //   headers: {
  //     authorization: `Bearer ${process.env.NEXT_PUBLIC_GIT_HUB_API}`,
  //   },
  // });

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
