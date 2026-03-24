import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // REMOVA o .tsx daqui, o Vite já entende

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Adicione outras rotas aqui depois */}
      </Routes>
    </Router>
  );
}

export default App;