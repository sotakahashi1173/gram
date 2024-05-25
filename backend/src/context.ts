import { PrismaClient } from "@prisma/client";
import { type YogaInitialContext } from "graphql-yoga";

export interface Context extends YogaInitialContext {
  req: Request;
  prisma: PrismaClient;
}
