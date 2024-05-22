import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Context } from "./context";
import { prisma } from "./infra/documentDB";
import { createUserWorkflow } from "./user/workflow/createUser";
import { saveUser } from "./user/repos/userRepository";
import { UnvalidatedUser } from "./user/objects/user";
import { error } from "console";

export const builder = new SchemaBuilder<{
  Context: Context;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

const CreateUserInput = builder.inputType("CreateUser", {
  fields: (t) => ({
    name: t.string({ required: true }),
  }),
});
const CreateUser = builder.objectRef<{ name: string }>("CreateUser");

builder.mutationField("createUser", (t) =>
  t.field({
    type: CreateUser,
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: (_root, { input }, context) => {
      const unvalidatedUser = {
        name: input.name,
        kind: "Unvalidated",
      } as UnvalidatedUser;

      const reulst = createUserWorkflow(unvalidatedUser);
      return reulst.match(
        (user) => ({ name: user.name }),
        (error) => {
          throw new Error();
        }
      );
    },
  })
);
