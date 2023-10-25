import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from 'graphql';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createUser,
  getUsers,
  getUserWithPasswordHashByUsername,
  User,
} from '../../../database/users';

export type GraphQlResponseBody =
  | {
      user: User;
    }
  | Error;

type CreateUser = {
  username: String!;
  email: String!;
  password: String!;
};

const typeDefs = gql`
  type User {
    id: ID!
    username: string!
    email: string!
  }

  type UserWithPasswordHash {
    id: ID!
    username: string!
    email: string!
    passwordHash: string!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): CreateUser
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await getUsers();
    },
    user: async (parent: null, args: { id: string }) => {
      return await getUserWithPasswordHashByUsername(args.id); // parseInt returns a typescript error can't assign number to type string
    },
  },
  Mutation: {
    createUser: async (parent: null, args: CreateUser) => {
      if (
        typeof args.username !== 'string' ||
        typeof args.email !== 'string' ||
        typeof args.password !== 'string'
      ) {
        throw new GraphQLError('Required field is missing');
      }
      return await createUser(args.username, args.email, args.password);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler(apolloServer);

export async function GET(
  req: NextRequest,
): Promise<NextResponse<GraphQlResponseBody>> {
  return (await handler(req)) as NextResponse<GraphQlResponseBody>;
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GraphQlResponseBody>> {
  return (await handler(req)) as NextResponse<GraphQlResponseBody>;
}
