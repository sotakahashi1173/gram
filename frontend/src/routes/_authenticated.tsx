import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    console.log("beforeLoad");
    console.log("beforeLoad", location.pathname);
    redirect({
      to: "/login",
    });
  },
});
