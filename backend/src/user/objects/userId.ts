import { Result, ok, err } from "neverthrow";
import { ValidationError } from "apollo-server-express";

export type UserId = string;

/**
 * ユーザーIDオブジェクト
 */
export function UserId(value: string): Result<UserId, ValidationError> {
  return validate(value)
    ? ok(value as UserId)
    : err(new ValidationError("Invalid user ID"));
}

/**
 * ユーザーIDのバリデーション
 * ユーザーIDが4文字以上10文字以下であればtrueを返す
 */
const validate = (value: string): boolean => {
  return value.length >= 4 && value.length <= 10;
};
