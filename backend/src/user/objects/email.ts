import { Result, ok, err } from "neverthrow";
import { ValidationError } from "../../err";

/**
 * email
 */
export type Email = string;

/**
 * emailオブジェクト生成関数
 */
export function Email(value: string): Result<Email, ValidationError> {
  const validResult = validateEmail(value);
  return validResult.isValid
    ? ok(value as Email)
    : err(new ValidationError(validResult.error!));
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * emailのバリデーション
 * emailのフォーマットが正しければtrueを返す
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let error = undefined;

  if (!email) {
    error = "メールアドレスを入力してください。";
  } else if (!emailRegex.test(email)) {
    error = "無効なメールアドレス形式です。";
  }

  return {
    isValid: error === undefined,
    error: error,
  };
};
