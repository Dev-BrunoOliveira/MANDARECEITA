import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  username: string; // ⭐⭐⭐
  avatar: string;
  isProfileCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const profileLink =
    user?.isProfileCompleted && user?.username
      ? `/user/${user.username}`
      : "/setup-profile";
      

  useEffect(() => {
    const storageUser = localStorage.getItem("@MandaReceita:user");

    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
