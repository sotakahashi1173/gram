import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    user: String
  }
`;

export const resolvers = {
  Query: {
    hello: () => "Hello!",
  },
};
