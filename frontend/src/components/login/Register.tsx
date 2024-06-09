import { useForm } from "react-hook-form";
import { supabase } from "@/auth/supabase";
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
import { type LoginForm, LoginSchema } from "./schema";
import { valibotResolver } from "@hookform/resolvers/valibot";

// FIXME: ログインをSinUpに修正する
const Login = () => {
  const form = useForm<LoginForm>({
    mode: "onBlur",
    resolver: valibotResolver(LoginSchema),
  });
  const onSubmit = async (data: LoginForm) => {
    try {
      const email = data.email;
      const password = data.password.password;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/welcome`,
        },
      });
      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      form.reset();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password.password"
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
        <FormField
          control={form.control}
          name="password.passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード確認用</FormLabel>
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

export default Login;
