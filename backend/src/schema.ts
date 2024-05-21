import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Context } from "./context";
import { prisma } from "./infra/documentDB";

export const builder = new SchemaBuilder<{
  Context: Context;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});
