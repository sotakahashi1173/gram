import { builder } from "../../builder";
import { UnvalidatedUser } from "../../../user/objects/user";
import { createUserWorkflow } from "../../../user/workflow/createUser";
import { saveUser } from "../../../user/repos/userRepository";
import { prisma } from "../../../infra/documentDB";

const CreateUserInput = builder.inputType("InputUser", {
  fields: (t) => ({
    name: t.string({ required: true }),
    role: t.string({ required: true }),
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});

const CreateUser = builder.objectRef<{
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
}>("CreateUser");

CreateUser.implement({
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    role: t.exposeString("role"),
    email: t.exposeString("email"),
    password: t.exposeString("password"),
  }),
});

builder.mutationField("CreateUser", (t) =>
  t.field({
    type: CreateUser,
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: (_root, { input }, context) => {
      const unvalidatedUser = {
        name: input.name,
        role: input.role,
        email: input.email,
        password: input.password,
        kind: "Unvalidated",
      } as UnvalidatedUser;

      const result = createUserWorkflow(unvalidatedUser).asyncAndThen(
        saveUser(context)
      );
      return result.match(
        (user) => ({
          id: user.id!,
          name: user.name,
          role: user.role,
          email: user.email,
          password: user.password,
        }),
        (error) => {
          throw error;
        }
      );
    },
  })
);

type CreateUserInput = typeof CreateUserInput.$inferInput;
type CreateUser = typeof CreateUser.$inferType;
