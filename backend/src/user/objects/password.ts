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

interface ValidationResult {
  isValid: boolean;
  error?: string;
}
/**
 * passwordのバリデーション
 * passwordのフォーマットが正しければtrueを返す
 */
export const validatePassword = (password: string): ValidationResult => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  let error = undefined;

  if (password.length < minLength) {
    error = "パスワードは最低8文字必要です。";
  }
  if (!hasUpperCase) {
    error = "パスワードには少なくとも1つの大文字が含まれている必要があります。";
  }
  if (!hasLowerCase) {
    error = "パスワードには少なくとも1つの小文字が含まれている必要があります。";
  }
  if (!hasNumber) {
    error = "パスワードには少なくとも1つの数字が含まれている必要があります。";
  }
  if (!hasSpecialChar) {
    error =
      "パスワードには少なくとも1つの特殊文字が含まれている必要があります。";
  }

  return {
    isValid: error === undefined,
    error,
  };
};
