import { createFileRoute } from "@tanstack/react-router";
import SignUp from "@/components/login/signUp";

export const Route = createFileRoute("/signUp")({
  component: signUp,
});

function signUp() {
  return <SignUp />;
}
