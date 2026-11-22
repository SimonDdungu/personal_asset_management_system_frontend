"use client";

import {
  createContext,
  ReactNode,
  useContext
} from "react";

import { useCurrentUser, useLogOut } from "@/src/hooks/auth/useUser";
import { AuthContextType } from "@/src/interfaces/auth/authContextType";
import { UserType } from "@/src/interfaces/auth/userType";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  
  const isAuthRoute = ["/login", "/signup"].includes(pathname);
  const { data: user, isLoading } = useCurrentUser(!isAuthRoute);

  const setUser = (user: UserType | null) => {
    queryClient.setQueryData(["user"], user);
  };

  const logoutMutation = useLogOut();

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.replace("/login");
    } catch (error) {
      console.error("failed to log out: ", error)
    }
  };

  const value: AuthContextType = {
    user: user ?? null,
    setUser,
    logout,
    isLoggingOut: logoutMutation.isPending,
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