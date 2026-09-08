import React, { useState, useEffect } from "react";
import type { User } from "../types/recipe";
import { AuthContext } from "./AuthContextValue";

const DEFAULT_USER: User = {
  name: "Bruno Santos de Oliveira",
  email: "bruno@email.com",
  bio: "Apaixonado(a) por culinária",
  location: "São Paulo, SP",
  profilePhoto: "https://i.pravatar.cc/150?u=me",
  isLoggedIn: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const storedUserDataStr = localStorage.getItem("userData");

      if (storedUserDataStr) {
        const parsedUser: User = JSON.parse(storedUserDataStr);
        setUser(parsedUser);
        setIsLoggedIn(storedIsLoggedIn);
      } else {
        setUser(DEFAULT_USER);
        setIsLoggedIn(storedIsLoggedIn || true);
        localStorage.setItem("userData", JSON.stringify(DEFAULT_USER));
        localStorage.setItem("isLoggedIn", "true");
      }
    } catch {
      setUser(DEFAULT_USER);
      setIsLoggedIn(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string, name?: string) => {
    const userName = name || email.split("@")[0];
    const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);

    const currentUserData = JSON.parse(localStorage.getItem("userData") || "{}");
    const updatedUser: User = {
      ...DEFAULT_USER,
      ...currentUserData,
      email,
      name: currentUserData.name || capitalizedName,
      isLoggedIn: true,
    };

    localStorage.setItem("userData", JSON.stringify(updatedUser));
    localStorage.setItem("isLoggedIn", "true");
    setUser(updatedUser);
    setIsLoggedIn(true);
  };

  const register = (name: string, email: string) => {
    const newUser: User = {
      name,
      email,
      bio: "Apaixonado(a) por culinária",
      location: "",
      profilePhoto: "https://i.pravatar.cc/150?u=" + encodeURIComponent(email),
      isLoggedIn: false,
    };

    localStorage.setItem("userData", JSON.stringify(newUser));
  };

  const loginGoogle = () => {
    const googleUser: User = {
      name: "Usuário Google",
      email: "usuario@gmail.com",
      bio: "Conectado via Google",
      location: "Brasil",
      profilePhoto: "https://i.pravatar.cc/150?u=google",
      isLoggedIn: true,
    };

    localStorage.setItem("userData", JSON.stringify(googleUser));
    localStorage.setItem("isLoggedIn", "true");
    setUser(googleUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUser = (updated: Partial<User>) => {
    if (!user) return;
    const newUserData = { ...user, ...updated };
    localStorage.setItem("userData", JSON.stringify(newUserData));
    setUser(newUserData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        register,
        loginGoogle,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
