import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import SetupProfile from "./pages/SetupProfile"
import Profile from "./pages/Profile"


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) return <div>Carregando...</div>

  return user ? <>{children}</> : <Navigate to="/" />
}


const RequireProfile = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) return null

  if (user && !user.isProfileCompleted) {
    return <Navigate to="/setup-profile" />
  }

  return <>{children}</>
}


function App() {
  return (
    <Router>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Cadastro */}
        <Route path="/register" element={<Register />} />

        {/* Feed */}
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

        {/* Onboarding */}
        <Route
          path="/setup-profile"
          element={
            <PrivateRoute>
              <SetupProfile />
            </PrivateRoute>
          }
        />

        {/* Perfil SOCIAL */}
        <Route
          path="/user/:username"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  )
}

export default App