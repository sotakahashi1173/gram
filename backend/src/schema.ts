import { gql } from "apollo-server-express";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

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

export type Context = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
};
