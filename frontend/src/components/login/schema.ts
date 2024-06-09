import * as v from "valibot";

export const EmailSchema = v.pipe(v.string(), v.email("Invalid email format."));

const passwordPattern =
  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d\W_]{8,32}$/;

export const PasswordSchema = v.pipe(
  v.object({
    password: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your password."),
      v.minLength(8, "Your password must have 8 characters or more."),
      v.regex(passwordPattern, "Your password is Invalid")
    ),
    passwordConfirm: v.string(),
  }),
  v.forward(
    v.check(
      (input) => input.password === input.passwordConfirm,
      "The two passwords do not match."
    ),
    ["passwordConfirm"]
  )
);

export const LoginSchema = v.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type LoginForm = v.InferInput<typeof LoginSchema>;
