import { Result, ok, err } from "neverthrow";
import { ValidationError } from "../../err";

/**
 * ユーザーロール
 */
export type UserRole = "ADMIN" | "MEMBER";

/**
 * ユーザーロールオブジェクト生成関数
 */
export function UserRole(value: string): Result<UserRole, ValidationError> {
  return validate(value)
    ? ok(value as UserRole)
    : err(new ValidationError("Invalid userRole"));
}

/**
 * ユーザーロールのバリデーション
 * ユーザー名がADMINまたはMEMBERであればtrueを返す
 */
const validate = (value: string): boolean => {
  return value === "ADMIN" || value === "MEMBER";
};
