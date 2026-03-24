import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuAberto, setIsMenuAberto] = useState(false);

  return (
    <header className="main-header">
        <div className="header-content">
          <h1>Manda Receita</h1>

          {/* Botão Hambúrguer (Aparece via CSS no Mobile) */}
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
                src="https://i.pravatar.cc/40"
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