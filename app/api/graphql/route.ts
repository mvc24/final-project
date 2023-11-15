import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getComboByID, getCombos } from '../../../database/combos';
import { getIngredientCombos } from '../../../database/ingredientCombos';
import { getIngredientComboTagsById } from '../../../database/ingredientComboTags';
import {
  getIngredientByID,
  getIngredients,
  getMainIngredients,
  getMainIngredientsById,
  getMainIngredientsBySlug,
} from '../../../database/ingredients';
import {
  createSession,
  getValidSessionByToken,
} from '../../../database/sessions';
import {
  createUser,
  deleteUserById,
  getUserBySessionToken,
  getUserByUsername,
  getUsers,
} from '../../../database/users';
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

type Token = {
  token: string;
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
  ...scalarTypeDefs,

  type User {
    id: ID!
    username: String!
    email: String!
    passwordHash: String!
  }

  type Token {
    token: String
  }

  type Comment = {
    id: ID!
    username: String!
    body: String!
    createdAt: DateTime
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
  }

  type Query {
    users: [User]
    user(username: String!): User
    loggedInUser(token: String!): LoggedInUser
    comments: [Comment]
    commentsByUsername(username: String!): Comment

    ingredients: [Ingredient]
    mainIngredients: [MainIngredient]
    mainIngredientById(id: Int!): MainIngredient
    mainIngredientBySlug(slug: String!): MainIngredient
    ingredientById(id: Int!): Ingredient
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): LoggedInUser
    deleteUserById(id: ID!): User
    logout(token: String): Token
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await getUsers();
    },
    user: async (parent: null, args: { username: string }) => {
      return await getUserByUsername(args.username);
    },
    loggedInUser: async (parent: null, args: { token: string }) => {
      return await getUserBySessionToken(args.token);
    },
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
      return await getMainIngredientsBySlug(args.name);
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
    console.log('sessionTokenCookie in handler: ', sessionTokenCookie);
    console.log('isLoggedIn: ', isLoggedIn);

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
