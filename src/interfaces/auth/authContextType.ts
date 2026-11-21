import { UserType } from "./userType";

export interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  setUser: (user: UserType | null) => void;
  isLoading: boolean;
  logout: () => void;
}