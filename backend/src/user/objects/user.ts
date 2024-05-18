import { ValidationError } from "apollo-server-express";
import { Result, ok, err } from "neverthrow";

export type UserId = string;

// ブログのユーザー情報を定義する
export interface User {
  id: UserId;
  name: string;
}

export function UserId(value: string): Result<UserId, ValidationError> {
  return validate(value)
    ? ok(value as UserId)
    : err(new ValidationError("Invalid user ID"));
}

/**
 *
 * @param value ユーザーID
 * @returns ユーザーIDが4文字以上10文字以下であればtrueを返す
 */
const validate = (value: string): boolean => {
  return value.length >= 4 && value.length <= 10;
};
