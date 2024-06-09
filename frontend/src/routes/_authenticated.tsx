import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    console.log("beforeLoad", location.pathname);
  },
  component: () => {
    return <div>Authenticated</div>;
  },
});
