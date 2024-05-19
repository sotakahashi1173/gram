import { Result, ok } from "neverthrow";
import { UserId } from "./userId";
import { ValidationError } from "apollo-server-express";
import { tuple } from "../../common/tuple";
import { UserName } from "./name";

export interface UnvalidatedUser {
  kind: "Unvalidated";
  name: string;
}

export interface ValidatedUser {
  kind: "Validated";
  name: UserName;
}

export interface CreatedUserId {
  id: UserId;
  name: UserName;
}

export type User = UnvalidatedUser | ValidatedUser | CreatedUserId;

export interface UserInput {
  id: string;
  name: string;
}

export const User = (
  userInput: UserInput
): Result<User, ValidationError | Error> => {
  const userId = UserId(userInput.id);
  const name = UserName(userInput.name);
  const values = Result.combine(tuple(userId, name));
  return values.map(([id, name]) => ({
    ...userInput,
    id,
    name,
  }));
};
