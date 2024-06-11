import React from "react";
export type AuthContextType = {
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  user: User;
};

export type User = {
  name: string;
  email: string;
};

const AuthContext = React.createContext<AuthContextType | null>(null);
