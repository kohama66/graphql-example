const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { users } = require("./user");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: Int
    name: String
    age: Int
    created_date: String
  }
  type Query {
    hello: String
    users: [User]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: () => users,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
  );
});
