import { gql } from "apollo-server";
import { Fetch } from "../common/fetch";

export const typeDefs = gql`
  type User {
    email: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
  }
`;

type UserQueryArgs = { id: string };
type CreateUserMutationArgs = { name: string; email: string; password: string };

export const resolvers = {
  Query: {
    user: (_: unknown, { id }: UserQueryArgs) => {
      return Fetch.get(`users/${id}`);
    },
    users: () => {
      return Fetch.get("users");
    },
  },
  Mutation: {
    createUser: (
      _: unknown,
      { name, email, password }: CreateUserMutationArgs
    ) => {
      return Fetch.post("users", { name, email, password });
    },
  },
};
