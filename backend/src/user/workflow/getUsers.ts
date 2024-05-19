import { Result, err, ok } from "neverthrow";
import { User, UserInput } from "../objects/user";
import { ValidationError } from "apollo-server-express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type Workflow = (
  model: UserInput
) => Result<User, Error | ValidationError | PrismaClientKnownRequestError>;

export const getUserWorkflow: Workflow = (model) =>
  model ? ok(model) : err(new Error("Invalid model"));
