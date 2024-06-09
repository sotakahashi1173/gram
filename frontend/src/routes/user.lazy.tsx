import { createLazyFileRoute } from "@tanstack/react-router";
import UsersList from "@/components/User/List";
import User from "@/components/login/Register";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/gql/client";

export const Route = createLazyFileRoute("/user")({
  component: usersList,
});

function usersList() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersList />
      <User />
    </QueryClientProvider>
  );
}
