import { Result, err, ok } from "neverthrow";
import {
  UnvalidatedUser,
  User,
  UserInput,
  ValidatedUser,
} from "../objects/user";
import { ValidationError } from "apollo-server-express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserName } from "../objects/name";

type Workflow = (
  model: UnvalidatedUser
) => Result<User, Error | ValidationError | PrismaClientKnownRequestError>;

export const createUserWorkflow: Workflow = (model) =>
  ok(model).andThen(validateUser);

type validateUser = (
  model: UnvalidatedUser
) => Result<ValidatedUser, ValidationError>;

const validateUser: validateUser = (model) => {
  const name = UserName(model.name);
  const values = Result.combine([name]);
  return values.map(([name]) => ({
    ...model,
    kind: "Validated",
    name,
  }));
};
