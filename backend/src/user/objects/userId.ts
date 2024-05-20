import { Result, ok, err } from "neverthrow";
import { ValidationError } from "apollo-server-express";

/**
 * ユーザーID 値オブジェクト
 */
export type UserId = newtype<"UserId", string>;

declare const __newtype: unique symbol;

export type newtype<Constructor, Type> = Type & {
  readonly [__newtype]: Constructor;
};

/**
 * ユーザーIDオブジェクト生成関数
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
