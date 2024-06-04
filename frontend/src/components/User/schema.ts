import * as v from "valibot";

export const NameSchema = v.pipe(
  v.string(),
  v.minLength(5, "At least 5 characters are required."),
  v.maxLength(10, "Up tp 10 characters are allowed.")
);

export const UserSchema = v.object({
  name: NameSchema,
});

export type UserForm = v.InferInput<typeof UserSchema>;
