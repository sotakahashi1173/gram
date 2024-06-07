import { Result, err, ok } from "neverthrow";
import {
  CreatedUser,
  UnvalidatedUser,
  User,
  ValidatedUser,
} from "../objects/user";
import { ValidationError } from "../../err";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserName } from "../objects/name";
import { UserId } from "../objects/userId";
import { UserRole } from "../objects/role";
import { tuple } from "../../common/tuple";

type Workflow = (
  model: UnvalidatedUser
) => Result<User, Error | ValidationError | PrismaClientKnownRequestError>;

export const createUserWorkflow: Workflow = (model) =>
  ok(model).andThen(validateUser).andThen(createUser);

type ValidateUser = (
  model: UnvalidatedUser
) => Result<ValidatedUser, ValidationError>;

const validateUser: ValidateUser = (model) => {
  const name = UserName(model.name);
  const role = UserRole(model.role);
  const values = Result.combine(tuple(name, role));
  return values.map(([name, role]) => ({
    ...model,
    kind: "Validated",
    name,
    role,
  }));
};

// TODO: IdentifyUserを作成する

/**
 * ユーザー作成関数
 */
type CreateUser = (model: ValidatedUser) => Result<CreatedUser, Error>;

export const createUser: CreateUser = (model) => {
  const value = UserId(null);
  return value.map((id) => ({
    ...model,
    kind: "Created",
    id,
  }));
};
