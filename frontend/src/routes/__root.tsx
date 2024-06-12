import { supabase } from "@/auth/supabase";
import {
  createRootRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  beforeLoad: async () => {
    supabase.auth.getSession().then((session) => {
      console.log("session", session);
      if (!session?.data.session?.user) {
        redirect({
          to: "/login",
        });
      }
    });
  },
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/user" className="[&.active]:font-bold">
          User
        </Link>{" "}
        <Link to="/signUp" className="[&.active]:font-bold">
          SignUp
        </Link>{" "}
        <Link to="/login" className="[&.active]:font-bold">
          Login
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
