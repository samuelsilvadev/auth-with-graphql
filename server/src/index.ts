import "./config";
import { ApolloServer, gql } from "apollo-server";
import {
  resolvers as usersResolvers,
  typeDefs as usersTypeDefs,
} from "./services/users/users";

const typeDefs = gql`
  type Query {
    _empty: String
  }

  ${usersTypeDefs}
`;

const resolvers = {
  Query: {
    _empty: () => "⚠️ Useless query ⚠️",
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
