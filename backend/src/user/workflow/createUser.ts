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
import { Email } from "../objects/email";
import { Password } from "../objects/password";

type Workflow = (
  model: UnvalidatedUser
) => Result<
  CreatedUser,
  Error | ValidationError | PrismaClientKnownRequestError
>;

export const createUserWorkflow: Workflow = (model) =>
  ok(model).andThen(validateUser).andThen(createUser);

type ValidateUser = (
  model: UnvalidatedUser
) => Result<ValidatedUser, ValidationError>;

const validateUser: ValidateUser = (model) => {
  const name = UserName(model.name);
  const role = UserRole(model.role);
  const email = Email(model.email);
  const password = Password(model.password);

  const values = Result.combine(tuple(name, role, email, password));
  return values.map(([name, role, email, password]) => ({
    ...model,
    kind: "Validated",
    name,
    role,
    email,
    password,
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
