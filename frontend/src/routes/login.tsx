import { createFileRoute } from "@tanstack/react-router";
import Register from "@/components/login/Register";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/gql/client";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <QueryClientProvider client={queryClient}>
      <Register />
    </QueryClientProvider>
  );
}
