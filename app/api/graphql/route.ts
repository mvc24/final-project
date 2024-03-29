import crypto from 'node:crypto';
import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createComment,
  deleteComment,
  getComments,
  getCommentsByIngredientSlug,
  getCommentsByUsername,
} from '../../../database/comments';
import {
  getIngredientByID,
  getIngredients,
  getMainIngredientBySlug,
  getMainIngredients,
  getMainIngredientsById,
} from '../../../database/ingredients';
import {
  createSession,
  getValidSessionByToken,
} from '../../../database/sessions';
import {
  createUser,
  deleteUserById,
  getUserById,
  getUserBySessionToken,
  getUserByUsername,
  getUsers,
} from '../../../database/users';
import { secureCookieOptions } from '../../../util/cookies';
import { User } from '../../../util/types';

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

type UserContext = {
  isUserLoggedIn: boolean;
  req: { cookies: { sessionToken: string } };
  user: {
    id: number;
    username: string;
  };
};

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    passwordHash: String!
  }

  type Token {
    token: String
  }

  type Comment {
    id: ID!
    userId: ID!
    username: String!
    body: String!
    ingredientId: Int!
    slug: String
  }

  type Ingredient {
    id: Int!
    name: String!
  }

  type MainIngredient {
    id: Int!
    name: String!
    slug: String
    image: String
    description: String
    recipe: String
  }

  type Combo {
    id: Int!
  }

  type Tags {
    id: Int!
    type: String!
    name: String!
  }

  type IngredientCombo {
    comboId: Int!
    ingredientNames: [Ingredient]
  }

  type IngredientInCombo {
    name: String!
  }

  type IngredientsObject {
    id: Int!
    name: String!
  }

  type IngredientComboWithObj {
    comboId: Int!
    ingredients: [IngredientsObject]
  }

  type IngredientComboTags {
    comboId: Int!
    type: String!
    name: [String]
  }

  type LoggedInUser {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    users: [User]
    userByName(username: String!): User
    userById(id: ID!): User
    loggedInUser(token: String!): LoggedInUser
    comments: [Comment]
    commentsByUsername(username: String!): Comment
    commentsByIngredientId(ingredientId: Int!): [Comment]
    commentsByIngredientSlug(slug: String): [Comment]

    ingredients: [Ingredient]
    mainIngredients: [MainIngredient]
    mainIngredientById(id: Int!): MainIngredient
    mainIngredientBySlug(slug: String!): MainIngredient
    ingredientById(id: Int!): Ingredient
  }
  type Mutation {
    # user mutations
    createUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): LoggedInUser
    logout(token: String): Token
    # this one doesn't work yet
    deleteUserById(id: ID!): User

    # comment mutations
    createComment(userId: ID!, body: String!, ingredientId: Int!): Comment
    deleteComment(id: ID!): Comment
  }
`;

const resolvers = {
  Query: {
    // user queries
    users: async () => {
      return await getUsers();
    },
    userByName: async (parent: null, args: { username: string }) => {
      return await getUserByUsername(args.username);
    },
    userById: async (parent: null, args: { id: number }) => {
      return await getUserById(args.id);
    },
    loggedInUser: async (parent: null, args: { token: string }) => {
      return await getUserBySessionToken(args.token);
    },

    // ingredient queries
    ingredients: async () => {
      return await getIngredients();
    },
    ingredientById: async (parent: null, args: { id: number }) => {
      return await getIngredientByID(args.id);
    },
    mainIngredients: async () => {
      return await getMainIngredients();
    },
    mainIngredientById: async (parent: null, args: { id: number }) => {
      return await getMainIngredientsById(args.id);
    },
    mainIngredientBySlug: async (parent: null, args: { name: string }) => {
      return await getMainIngredientBySlug(args.name);
    },

    // comment queries
    comments: async () => {
      return await getComments();
    },
    commentsByUsername: async (parent: null, args: { username: string }) => {
      return await getCommentsByUsername(args.username);
    },
    commentsByIngredientId: async (
      parent: null,
      args: { ingredientId: number },
    ) => {
      const ingredientId = args.ingredientId.toString();
      return await getCommentsByUsername(ingredientId);
    },

    commentsByIngredientSlug: async (parent: null, args: { slug: string }) => {
      return await getCommentsByIngredientSlug(args.slug);
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

        // console.log('create user: ', newUser);

        const token = crypto.randomBytes(80).toString('base64');
        // console.log('token: ', token);

        const session = await createSession(newUser.id, token);

        if (!session) {
          throw new GraphQLError('No session created.');
        }

        cookies().set({
          name: 'sessionToken',
          value: session.token,
          ...secureCookieOptions,
        });

        // console.log('session token in sign up: ', session.token);

        return await getUserBySessionToken(session.token);
      }
    },

    login: async (
      parent: null,
      args: { username: string; password: string },
    ) => {
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
        const token = crypto.randomBytes(80).toString('base64');
        console.log('token: ', token);

        const session = await createSession(user.id, token);

        if (!session) {
          throw new GraphQLError('No session created.');
        }

        cookies().set({
          name: 'sessionToken',
          value: session.token,
          ...secureCookieOptions,
        });

        //  console.log('session token in login: ', session.token);

        return getUserBySessionToken(session.token);
      } else {
        throw new GraphQLError('Password or username is incorrect.');
      }
    },
    deleteUserById: async (
      parent: null,
      args: { id: number },
      context: UserContext,
    ) => {
      if (context.user.id && context.user.id !== args.id) {
        throw new GraphQLError('Unauthorized operation');
      }
      await deleteUserById(args.id);
    },

    createComment: async (
      parent: null,
      args: { userId: string; body: string; ingredientId: number },
    ) => {
      if (typeof args.userId !== 'string' || !args.userId) {
        throw new GraphQLError('Required field userId is missing');
      } else if (typeof args.body !== 'string' || !args.body) {
        throw new GraphQLError('Required field body is missing');
      }
      const userId = parseInt(args.userId);

      return await createComment(userId, args.body, args.ingredientId);
    },

    deleteComment: async (parent: null, args: { id: number }) => {
      return await deleteComment(args.id);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req, res) => {
    const sessionTokenCookie = cookies().get('sessionToken');
    const isLoggedIn =
      sessionTokenCookie &&
      (await getValidSessionByToken(sessionTokenCookie.value));
    const user = isLoggedIn
      ? await getUserBySessionToken(sessionTokenCookie.value)
      : undefined;
    // console.log('sessionTokenCookie in handler: ', sessionTokenCookie);
    // console.log('isLoggedIn: ', isLoggedIn);

    return {
      req,
      res,
      isLoggedIn,
      user,
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
