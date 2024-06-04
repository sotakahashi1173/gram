import { useForm } from "react-hook-form";
import { useCreateUser } from "@/App";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FormData = {
  name: string;
};

const User = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const createUser = useCreateUser();
  const onSubmit = handleSubmit((data) => createUser.mutate(data));
  return (
    <form onSubmit={onSubmit}>
      <label>Name</label>
      <Input {...register("name")} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default User;
