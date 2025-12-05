import { createContext } from "react";
import { UserType } from "@/types/user";

export interface AuthContextType {
  user: UserType | null;
  isLoggedIn: boolean;
  login: (user: UserType) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
