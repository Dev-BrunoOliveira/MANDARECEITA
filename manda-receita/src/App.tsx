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

  return user ? <>{children}</> : <Navigate to="/" replace />
}

const RequireProfile = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) return <div>Carregando...</div>

  if (user && !user.isProfileCompleted) {
    return <Navigate to="/setup-profile" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

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

        <Route
          path="/setup-profile"
          element={
            <PrivateRoute>
              <SetupProfile />
            </PrivateRoute>
          }
        />

        {/* ⭐ PERFIL CORRIGIDO */}
        <Route
          path="/user/:username"
          element={
            <PrivateRoute>
              <RequireProfile>
                <Profile />
              </RequireProfile>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  )
}

export default App