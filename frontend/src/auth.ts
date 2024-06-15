import React, {createContext} from "react";
import { supabase } from "./auth/supabase";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export type AuthContextType = {
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  user: User;
};

export type User = {
  name: string;
  email: string;
  permissions: any
  } | null;

const AuthContext = createContext<AuthContextType | null>(null);


async function fetchPermissions() {
  const data = await supabase.auth.getSession();
  const user = data.data.session?.user
  return user;
}

export const permissionsQueryOptions = queryOptions({
  queryKey: ['permissions'],
  queryFn: () => fetchPermissions(),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const permissionsQuery = useSuspenseQuery(permissionsQueryOptions);

  const [user, setUser] = React.useState<User>({
    name: '',
    email: '',
    permissions: permissionsQuery.data ? permissionsQuery.data : null
  });
  const isAuthenticated = !!user?.name;
  return (
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}