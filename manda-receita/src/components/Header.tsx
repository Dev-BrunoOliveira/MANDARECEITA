import { useState, useMemo } from "react"; // Adicionamos useMemo
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isMenuAberto, setIsMenuAberto] = useState(false);
  const { user } = useAuth();

  console.log("Estado do usuário no Header:", user);

  const profileLink = useMemo(() => {
    return user?.isProfileCompleted ? `/perfil/${user.id}` : "/setup-profile";
  }, [user]);

  return (
    <header className="main-header">
      <div className="header-content">
        <h1>Manda Receita</h1>

        <button
          className="menu-hamburger"
          onClick={() => setIsMenuAberto(!isMenuAberto)}
        >
          <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
          <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
          <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
        </button>

        <nav className={`header-nav ${isMenuAberto ? "active" : ""}`}>
          <div className="nav-links">
            <Link to="/principal" onClick={() => setIsMenuAberto(false)}>
              Página Inicial
            </Link>
            <a href="#" onClick={() => setIsMenuAberto(false)}>
              Categorias
            </a>
            <a href="#" onClick={() => setIsMenuAberto(false)}>
              Minhas Receitas
            </a>
          </div>

          <Link
            to={profileLink}
            className="nav-user"
            onClick={() => setIsMenuAberto(false)}
          >
            <span>{user?.name || "Meu Perfil"}</span>
            <img
              src={user?.avatar || "https://via.placeholder.com/40"}
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
