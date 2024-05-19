import { Result, err, ok } from "neverthrow";
import { UserId } from "./userId";
import { ValidationError } from "apollo-server-express";

// ブログのユーザー情報を定義する
export interface User {
  id: UserId;
  name: string;
}

interface UserInput {
  id: string;
  name: string;
}

export const User = (
  userInput: UserInput
): Result<User, ValidationError | Error> => {
  const userId = UserId(userInput.id);
  const name = userInput.id
    ? ok(userInput.name as string)
    : err(new Error("Invalid name"));
  const values = Result.combine(tuple(userId, name));
  return values.map(([id, name]) => ({
    ...userInput,
    id,
    name,
  }));
};

// TODO: commonに書き出す
function tuple<T extends any[]>(...args: T) {
  return args;
}
