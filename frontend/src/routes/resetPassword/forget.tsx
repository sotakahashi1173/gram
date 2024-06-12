import { createFileRoute } from "@tanstack/react-router";
import ForgetPassword from "./-component/forget";

export const Route = createFileRoute("/resetPassword/forget")({
  component: forgetPassword,
});

function forgetPassword() {
  return <ForgetPassword />;
}
