import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { headers } from 'next/headers';

export const { getClient } = registerApolloClient(() => {
  // Local GraphQL server API Link
  const localLink = new HttpLink({
    // uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
    // uri: 'http://localhost:3000/api/graphql',
    // uri: 'https://final-project-upleveled-sage.fly.dev/api/graphql',
  uri: "https://final-project-uplevled-sage.vercel.app/api/graphql",
    credentials: 'same-origin',
  });

  headers();
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: localLink,
  });
});
