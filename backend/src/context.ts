import { prisma as PrismaClient } from "./infra/documentDB";
import { type YogaInitialContext } from "graphql-yoga";
import { User } from "./user/objects/user";

export interface Context extends YogaInitialContext {
  req: Request;
  prisma: typeof PrismaClient;
  user?: User;
}
