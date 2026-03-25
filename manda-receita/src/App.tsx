import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import SetupProfile from "./pages/SetupProfile"
import Profile from "./pages/Profile" 

// Rota para quem precisa estar logado
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth() // Pega o loading aqui também
  
  // IMPORTANTE: Enquanto estiver lendo o localStorage, não redireciona!
  if (loading) return <div className="loading-screen">Carregando...</div>
  
  return user ? <>{children}</> : <Navigate to="/" />
}

// Rota que obriga o preenchimento do perfil antes de ir para a Home
const RequireProfile = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) return null // Espera carregar

  if (user && !user.isProfileCompleted) {
    return <Navigate to="/setup-profile" />
  }

  return <>{children}</>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home: Logado + Perfil Completo */}
        <Route
          path="/principal"
          element={
            <PrivateRoute>
              <RequireProfile>
                <Home />
              </RequireProfile>
            </PrivateRoute>
          }
        />

        {/* Setup: Apenas Logado */}
        <Route
          path="/setup-profile"
          element={
            <PrivateRoute>
              <SetupProfile />
            </PrivateRoute>
          }
        />

        {/* Perfil: Logado */}
        <Route 
          path="/perfil/:id" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App