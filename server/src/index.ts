import "./config";
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    email: String!
  }

  type Query {
    user: User
  }
`;

const resolvers = {
  Query: {},
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
