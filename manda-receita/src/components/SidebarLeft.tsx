import React from "react";
import { useAuth } from "../hooks/useAuth";
import type { Receita } from "../types/recipe";

interface SidebarLeftProps {
  receitas: Receita[];
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({
  receitas,
  activeFilter,
  onSelectFilter,
  activeCategory,
  onSelectCategory,
}) => {
  const { user } = useAuth();

  const userReceitasCount = receitas.filter((r) => r.nomeChef === user?.name).length;
  const userLikesCount = receitas
    .filter((r) => r.nomeChef === user?.name)
    .reduce((acc, curr) => acc + (curr.likes || 0), 0);

  let bioText = user?.bio || "Apaixonado(a) por culinária";
  if (user?.location) bioText += ` - ${user.location}`;

  return (
    <aside className="sidebar sidebar-left">
      <div className="profile-card">
        <div className="profile-cover">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Capa"
          />
        </div>
        <div className="profile-info">
          <img
            src={user?.profilePhoto || "https://i.pravatar.cc/80?u=me"}
            alt="Foto de perfil"
            className="profile-avatar"
          />
          <h3>{user?.name || "Usuário"}</h3>
          <p className="profile-bio">{bioText}</p>
          <div className="profile-stats">
            <div className="stat">
              <strong>{userReceitasCount}</strong>
              <span>Receitas</span>
            </div>
            <div className="stat">
              <strong>{userLikesCount}</strong>
              <span>Curtidas</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <h4>Navegação</h4>
        <ul>
          <li>
            <a
              href="#"
              className={activeFilter === "all" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onSelectFilter("all");
              }}
            >
              <i className="fas fa-house"></i> Página Inicial
            </a>
          </li>
          <li>
            <a
              href="#"
              className={activeFilter === "em-alta" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onSelectFilter("em-alta");
              }}
            >
              <i className="fas fa-fire"></i> Em Alta
            </a>
          </li>
          <li>
            <a
              href="#"
              className={activeFilter === "salvos" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onSelectFilter("salvos");
              }}
            >
              <i className="fas fa-bookmark"></i> Salvos
            </a>
          </li>
          <li>
            <a
              href="#"
              className={activeFilter === "recentes" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onSelectFilter("recentes");
              }}
            >
              <i className="fas fa-clock-rotate-left"></i> Recentes
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-categories">
        <h4>Categorias</h4>
        <div className="category-tags">
          <span
            className={`tag ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => onSelectCategory("all")}
          >
            Todos
          </span>
          <span
            className={`tag ${activeCategory === "salgados" ? "active" : ""}`}
            onClick={() => onSelectCategory("salgados")}
          >
            Salgados
          </span>
          <span
            className={`tag ${activeCategory === "doces" ? "active" : ""}`}
            onClick={() => onSelectCategory("doces")}
          >
            Doces
          </span>
          <span
            className={`tag ${activeCategory === "entradas" ? "active" : ""}`}
            onClick={() => onSelectCategory("entradas")}
          >
            Entradas
          </span>
          <span
            className={`tag ${activeCategory === "sobremesas" ? "active" : ""}`}
            onClick={() => onSelectCategory("sobremesas")}
          >
            Sobremesas
          </span>
          <span
            className={`tag ${activeCategory === "prato-principal" ? "active" : ""}`}
            onClick={() => onSelectCategory("prato-principal")}
          >
            Prato Principal
          </span>
          <span
            className={`tag ${activeCategory === "caldos" ? "active" : ""}`}
            onClick={() => onSelectCategory("caldos")}
          >
            Caldos & Sopas
          </span>
        </div>
      </div>
    </aside>
  );
};

export default SidebarLeft;
