import { useForm } from "react-hook-form";
import { useCreateUser } from "@/gql/User";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { type UserForm, UserSchema } from "./schema";
import { valibotResolver } from "@hookform/resolvers/valibot";

const User = () => {
  const form = useForm<UserForm>({
    mode: "onBlur",
    resolver: valibotResolver(UserSchema),
  });
  const createUser = useCreateUser();
  const onSubmit = (data: UserForm) => createUser.mutate(data);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">登録</Button>
      </form>
    </Form>
  );
};

export default User;
