import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from 'graphql';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUsers,
  getUserWithPasswordHashByUsername,
} from '../../../database/users';

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
};
