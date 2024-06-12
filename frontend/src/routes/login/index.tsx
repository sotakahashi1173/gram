import { createFileRoute } from "@tanstack/react-router";
import Login from "./-component";

export const Route = createFileRoute("/login/")({
  component: login,
});

function login() {
  return <Login />;
}
