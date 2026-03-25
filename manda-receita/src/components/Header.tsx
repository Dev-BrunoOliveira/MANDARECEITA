import { useState, useEffect } from "react"; // Adicionamos o useEffect
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuAberto, setIsMenuAberto] = useState(false);
  const [fotoUsuario, setFotoUsuario] = useState("https://via.placeholder.com/40");

  // Esse efeito roda toda vez que o Header aparece na tela
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('@MandaReceita:perfil');
    if (dadosSalvos) {
      const { foto } = JSON.parse(dadosSalvos);
      if (foto) setFotoUsuario(foto); // Se tiver foto no banco, usa ela
    }
  }, []);

  return (
    <header className="main-header">
        <div className="header-content">
          <h1>Manda Receita</h1>

          <button 
            className="menu-hamburger" 
            onClick={() => setIsMenuAberto(!isMenuAberto)}
            aria-label="Abrir menu"
          >
            <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
            <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
            <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
          </button>
          
          <nav className={`header-nav ${isMenuAberto ? "active" : ""}`}>
            <div className="nav-links">
              <Link to="/principal" onClick={() => setIsMenuAberto(false)}>Página Inicial</Link>
              <a href="#" onClick={() => setIsMenuAberto(false)}>Categorias</a>
              <a href="#" onClick={() => setIsMenuAberto(false)}>Minhas Receitas</a>
            </div>

            <Link to="/setup-profile" className="nav-user" onClick={() => setIsMenuAberto(false)}>
              <span>Meu Perfil</span>
              <img
                src={fotoUsuario} // <-- AGORA USA A FOTO DO ESTADO
                alt="Avatar"
                className="nav-avatar"
              />
            </Link>
          </nav>
        </div>
      </header>
  );
};

export default Header;