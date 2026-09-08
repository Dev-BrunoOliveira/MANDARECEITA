import { createContext } from "react";
import type { User } from "../types/recipe";

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  loginGoogle: () => void;
  logout: () => void;
  updateUser: (updated: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
