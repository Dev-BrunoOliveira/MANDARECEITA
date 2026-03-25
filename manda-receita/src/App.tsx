import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import SetupProfile from "./pages/SetupProfile"


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}

const OnboardingRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth()

  if (user && !user.isProfileCompleted) {
    return <Navigate to="/setup-profile" />
  }

  return children
}


function App() {
  return (
    <Router>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Cadastro */}
        <Route path="/register" element={<Register />} />

        {/* Feed principal protegido */}
        <Route
          path="/principal"
          element={
            <PrivateRoute>
              <OnboardingRoute>
                <Home />
              </OnboardingRoute>
            </PrivateRoute>
          }
        />

        {/* Setup Profile */}
        <Route
          path="/setup-profile"
          element={
            <PrivateRoute>
              <SetupProfile />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  )
}

export default App