import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '../../../database/sessions';
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

type LogInContext = {
  isLoggedIn: boolean;
};

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    passwordHash: String!
  }

  type LoggedInUser {
    id: ID!
    username: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    loggedInUser(token: String!): LoggedInUser
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): LoggedInUser
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await getUsers();
    },
    user: async (parent: null, args: { username: string }) => {
      return await getUserByUsername(args.username); // parseInt returns a typescript error can't assign number to type string
    },
    loggedInUser: async (parent: null, args: { token: string }) => {
      return await getUserBySessionToken(args.token);
    },
  },
  Mutation: {
    createUser: async (parent: null, args: CreateUser) => {
      const user = await getUserByUsername(args.username);

      if (
        typeof args.username !== 'string' ||
        typeof args.email !== 'string' ||
        typeof args.password !== 'string'
      ) {
        throw new GraphQLError('Required field is missing');
      } else if (user) {
        throw new GraphQLError(
          'Username already exists, please choose another one.',
        );
      } else {
        const hashedPassword = await bcrypt.hash(args.password, 10);

        const newUser = await createUser(
          args.username,
          args.email,
          hashedPassword,
        );

        if (!newUser) {
          throw new GraphQLError('No user was created.');
        }
        // const isValid: boolean = await bcrypt.compare(
        //   args.password,
        //   newUser.passwordHash,
        // );

        console.log('create user: ', newUser);

        const payload = {
          userId: newUser.id,
          username: newUser.username,
          email: newUser.email,
        };
        const options = {
          expiresIn: '24h',
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, options);
        console.log('token: ', token);

        const session = await createSession(newUser.id, token);

        if (!session) {
          throw new GraphQLError('No session created.');
        }

        cookies().set({
          name: 'sessionToken',
          value: session.token,
        });

        console.log('session token in sign up: ', session.token);

        return await getUserBySessionToken(session.token);
      }
    },

    login: async (
      parent: null,
      args: { username: string; password: string },
    ) => {
      console.log('login endpoint from router: ', args.username, args.password);
      if (
        typeof args.username !== 'string' ||
        typeof args.password !== 'string' ||
        !args.username ||
        !args.password
      ) {
        throw new GraphQLError('Required field is missing!');
      } else {
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
        console.log('token: ', token);

        const session = await createSession(user.id, token);

        if (!session) {
          throw new GraphQLError('No session created.');
        }

        cookies().set({
          name: 'sessionToken',
          value: session.token,
        });

        console.log('session token in login: ', session.token);

        return getUserBySessionToken(session.token);
      } else {
        throw new GraphQLError('Password or username is incorrect.');
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

    const sessionTokenCookie = req.cookies.get('sessionToken');

    console.log('req.cookies: ', req.cookies.get('sessionToken'));

    // const sessionTokenCookie = cookies().get('sessionToken');

    console.log('sessionTokenCookie in handler', sessionTokenCookie);

    const session =
      sessionTokenCookie &&
      (await getUserBySessionToken(sessionTokenCookie.value));

    console.log('check if the session is valid: ', session);

    // const isAdmin = await isUserAdminBySessionToken(fakeSessionToken?.value);

    //  const sessionCookie = cookies().get('sessionToken');

    // console.log('Session cookie: ', sessionCookie);

    // const loggedInUser = getUserBySessionToken('sessionToken');

    return {
      session,
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
