import { PrismaClient } from "@prisma/client";
import { type YogaInitialContext } from "graphql-yoga";
import { User } from "./user/objects/user";

export interface Context extends YogaInitialContext {
  req: Request;
  prisma: PrismaClient;
  user?: User;
}
