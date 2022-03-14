import { gql } from "apollo-server";
import { Fetch } from "../common/fetch";
import { isPasswordCorrect } from "./auth-utilities";

type SignInMutationArgs = { email: string; password: string };
type User = { id: number; name: string; email: string; hash: string };
type Session = {
  id: number;
  userId: number;
  createdAt: string;
  validUntil: string;
  signedOut: boolean;
};

export const typeDefs = gql`
  type Mutation {
    signIn(email: String!, password: String!): User
  }
`;

export const resolvers = {
  Mutation: {
    signIn: async (_: unknown, { email, password }: SignInMutationArgs) => {
      const [user]: [User | undefined] =
        (await Fetch.get(`users?email=${email}`)) || [];

      if (user && isPasswordCorrect(password, user.hash)) {
        const [userSession]: [Session | undefined] = await Fetch.get(
          `sessions?userId=${user.id}&signedOut=false`
        );

        if (userSession) {
          const isSessionStillValid =
            new Date(userSession.createdAt).getTime() <
            new Date(userSession.validUntil).getTime();

          if (isSessionStillValid) {
            return user;
          }
        }

        const validUntil = new Date();
        validUntil.setMinutes(validUntil.getMinutes() + 30);

        await Fetch.post("sessions", {
          userId: user.id,
          createdAt: new Date().toISOString(),
          validUntil: validUntil.toISOString(),
          signedOut: false,
        });

        return user;
      }

      return null;
    },
  },
};
