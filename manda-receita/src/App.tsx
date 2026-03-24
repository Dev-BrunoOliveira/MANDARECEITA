import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";   
import Register from "./pages/Register.tsx"; 
import Home from "./pages/Home.tsx";       
import SetupProfile from "./pages/SetupProfile.tsx";

function App() {
  return (
    <Router>
      <Routes>
        
        {/* Rota Inicial (Login) */}
        <Route path="/" element={<Login />} />
        
        {/* Rota de Cadastro */}
        <Route path="/register" element={<Register />} />
        
        {/* Rota do Feed Principal */}
        <Route path="/principal" element={<Home />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
      </Routes>
    </Router>
  );
}

export default App;