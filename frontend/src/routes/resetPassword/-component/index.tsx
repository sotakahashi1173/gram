import { useForm } from "react-hook-form";
import { supabase } from "@/auth/supabase";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  type UpdatePasswordForm,
  PasswordSchema,
} from "@/components/login/schema";

const ResetPassword = () => {
  const form = useForm<UpdatePasswordForm>({
    mode: "onBlur",
    resolver: valibotResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = async (data: UpdatePasswordForm) => {
    try {
      const password = data.password;
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      form.reset({ password: data.password });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
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

export default ResetPassword;
