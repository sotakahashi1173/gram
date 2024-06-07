import { Result, ok, err } from "neverthrow";
import { ValidationError } from "../../err";

/**
 * password
 */
export type Password = string;

/**
 * passwordオブジェクト生成関数
 */
export function Password(value: string): Result<Password, ValidationError> {
  return validatePassword(value)
    ? ok(value as Password)
    : err(new ValidationError("Invalid Password"));
}

/**
 * passwordのバリデーション
 * passwordのフォーマットが正しければtrueを返す
 */
export const validatePassword = (value: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  return (
    value.length > minLength &&
    minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};
