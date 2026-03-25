import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: number;
  name: string;
  avatar: string;
  isProfileCompleted: boolean; // <--- Olhe bem para este nome
}

interface AuthContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean // Adicionamos o loading para o App.tsx saber quando terminou de ler o storage
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true) // Começa carregando

  // --- O SEGREDO ESTÁ AQUI ---
  // Este efeito roda UMA VEZ assim que o app abre
  useEffect(() => {
    const storageUser = localStorage.getItem("@MandaReceita:user")

    if (storageUser) {
      setUser(JSON.parse(storageUser))
    }
    
    setLoading(false) // Terminou de buscar no "banco" local
  }, [])

  return (
    // Passamos o loading para as rotas protegidas usarem
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}