"use client";

import {
  createContext,
  ReactNode,
  useContext
} from "react";

import { useCurrentUser } from "@/src/hooks/auth/useUser";
import { AuthContextType } from "@/src/interfaces/auth/authContextType";
import { UserType } from "@/src/interfaces/auth/userType";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  
  const isAuthRoute = ["/login", "/signup"].includes(pathname);
  const { data: user, isLoading } = useCurrentUser(!isAuthRoute);

  const setUser = (user: UserType | null) => {
    queryClient.setQueryData(["user"], user);
  };

  const logout = () => {
    queryClient.setQueryData(["user"], null);
    queryClient.removeQueries({ queryKey: ["user"] });
  };

  const value: AuthContextType = {
    user: user ?? null,
    setUser,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};