import "./config";
import { ApolloServer, gql } from "apollo-server";
import {
  resolvers as usersResolvers,
  typeDefs as usersTypeDefs,
} from "./services/users/users";
import {
  resolvers as authResolvers,
  typeDefs as authTypeDefs,
} from "./services/auth/auth";

const typeDefs = gql`
  type Query {
    _empty: String
  }

  ${usersTypeDefs}
  ${authTypeDefs}
`;

const resolvers = {
  Query: {
    _empty: () => "⚠️ Useless query ⚠️",
    ...usersResolvers.Query,
    ...authResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...authResolvers.Mutation,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
