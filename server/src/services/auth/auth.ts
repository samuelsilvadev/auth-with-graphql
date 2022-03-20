import { gql } from "apollo-server";
import { Fetch } from "../common/fetch";
import { isPasswordCorrect } from "./auth-utilities";

type UserQueryArgs = { email: string; password: string };
type SignInMutationArgs = { email: string; password: string };
type SignOutMutationArgs = { email: string };
type User = { id: number; name: string; email: string; hash: string };
type Session = {
  id: number;
  userId: number;
  createdAt: string;
  validUntil: string;
  signedOut: boolean;
};

export const typeDefs = gql`
  type Query {
    """
    Returns the user if is logged in
    """
    loggedInUser(email: String!, password: String!): User
  }

  type Mutation {
    signIn(email: String!, password: String!): User
    signOut(email: String!): User
  }
`;

async function isSessionStillValid(userId: number) {
  const [userSession]: [Session | undefined] = await Fetch.get(
    `sessions?userId=${userId}&signedOut=false&_sort=createdAt&_order=desc`
  );

  if (userSession) {
    const isSessionStillValid =
      new Date(userSession.validUntil).getTime() > Date.now();

    return isSessionStillValid;
  }

  return false;
}

async function createNewSession(userId: number) {
  const validUntil = new Date();
  validUntil.setMinutes(validUntil.getMinutes() + 30);

  await Fetch.post("sessions", {
    userId: userId,
    createdAt: new Date().toISOString(),
    validUntil: validUntil.toISOString(),
    signedOut: false,
  });
}

export const resolvers = {
  Query: {
    loggedInUser: async (_: unknown, { email, password }: UserQueryArgs) => {
      const [user]: [User | undefined] =
        (await Fetch.get(`users?email=${email}`)) || [];

      if (user) {
        const _isPasswordCorrect = await isPasswordCorrect(password, user.hash);

        if (!_isPasswordCorrect) {
          return null;
        }

        const _isSessionStillValid = await isSessionStillValid(user.id);

        if (_isSessionStillValid) {
          return user;
        }
      }

      return null;
    },
  },
  Mutation: {
    signIn: async (_: unknown, { email, password }: SignInMutationArgs) => {
      const [user]: [User | undefined] =
        (await Fetch.get(`users?email=${email}`)) || [];

      if (user) {
        const _isPasswordCorrect = await isPasswordCorrect(password, user.hash);

        if (!_isPasswordCorrect) {
          return null;
        }

        const _isSessionStillValid = await isSessionStillValid(user.id);

        if (_isSessionStillValid) {
          return user;
        }

        await createNewSession(user.id);

        return user;
      }

      return null;
    },
    signOut: async (_: unknown, { email }: SignOutMutationArgs) => {
      const [user]: [User | undefined] =
        (await Fetch.get(`users?email=${email}`)) || [];

      if (user) {
        const [userSession]: [Session | undefined] = await Fetch.get(
          `sessions?userId=${user.id}&signedOut=false&_sort=createdAt&_order=desc`
        );

        if (userSession) {
          await Fetch.patch(`sessions/${userSession.id}`, {
            signedOut: true,
          });

          return user;
        }
      }

      return null;
    },
  },
};
