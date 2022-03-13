import { gql } from "apollo-server";
import { Fetch } from "../common/fetch";

export const typeDefs = gql`
  type User {
    email: String!
  }

  extend type Query {
    users: [User]
  }
`;

export const resolvers = {
  Query: {
    users: () => {
      return Fetch.get("users");
    },
  },
};
