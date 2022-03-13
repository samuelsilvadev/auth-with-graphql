import { gql } from "apollo-server";
import { Fetch } from "../common/fetch";

export const typeDefs = gql`
  type User {
    email: String!
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }
`;

type UserQueryArgs = { id: string };

export const resolvers = {
  Query: {
    user: (_: unknown, { id }: UserQueryArgs) => {
      return Fetch.get(`users/${id}`);
    },
    users: () => {
      return Fetch.get("users");
    },
  },
};
