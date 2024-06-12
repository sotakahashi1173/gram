import { createFileRoute } from "@tanstack/react-router";
import ResetPassword from "./-component";

export const Route = createFileRoute("/resetPassword/")({
  component: resetPassword,
});
function resetPassword() {
  return <ResetPassword />;
}
