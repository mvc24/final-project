import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { use } from 'react';
import { z } from 'zod';
import {
  createSession,
  getValidSessionByToken,
} from '../../../database/sessions';
import {
  createUser,
  getUserBySessionToken,
  getUserByUsername,
  getUsers,
  User,
} from '../../../database/users';

export type GraphQlResponseBody =
  | {
      user: User;
    }
  | Error;

type CreateUser = {
  username: string;
  email: string;
  password: string;
};

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    passwordHash: String!
  }

  type LogInResponse {
    user: User!
  }

  type SignUpResponse {
    token: String
    error: String
  }
  type Query {
    users: [User]
    user(username: String!): User
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): User

    # register($username: String!, $email: String!, $password: String!) {
    #   signUp(username: $username, email: $email, password: $password): SignUpResponse
    # }

    # login ($username: String!, $password: String!){
    # signIn(username: String!, password: String!): SignInResponse}
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await getUsers();
    },
    user: async (parent: null, args: { username: string }) => {
      return (await getUserByUsername(args.username)) as User; // parseInt returns a typescript error can't assign number to type string
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
      const hashedPassword = await bcrypt.hash(args.password, 10);

      return await createUser(args.username, args.email, hashedPassword);
    },

    login: async (
      parent: null,
      args: { username: string; password: string; id: number },
    ) => {
      if (
        typeof args.username !== 'string' ||
        typeof args.password !== 'string' ||
        !args.username ||
        !args.password
      ) {
        throw new GraphQLError('Required field is missing!');
      }

      const user = await getUserByUsername(args.username);
      if (!user) {
        throw new GraphQLError('No user found.');
      }

      const isValid: boolean = await bcrypt.compare(
        args.password,
        user.passwordHash,
      );

      if (isValid) {
        const payload = {
          userId: user.id,
          username: user.username,
          email: user.email,
        };
        const options = {
          expiresIn: '24h',
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, options);

        cookies().set({
          name: 'sessionToken',
          value: token,
        });

        return user;
      }
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req) => {
    // FIXME: Implement secure authentication and Authorization
    const sessionTokenCookie = cookies().get('sessionToken');
    const session =
      sessionTokenCookie &&
      (await getValidSessionByToken(sessionTokenCookie.value));

    return {
      req,
    };
  },
});

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
