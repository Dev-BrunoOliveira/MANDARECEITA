import React, { useState } from "react";
import { useToast } from "../hooks/useToast";
import type { Receita } from "../types/recipe";

interface SidebarRightProps {
  receitas: Receita[];
  onSelectRecipe: (receita: Receita) => void;
}

interface SuggestedChef {
  id: number;
  name: string;
  avatar: string;
  recipesCount: number;
}

const INITIAL_SUGGESTED: SuggestedChef[] = [
  { id: 1, name: "Ana Cozinha", avatar: "https://i.pravatar.cc/36?u=chef1", recipesCount: 42 },
  { id: 2, name: "Chef Carlos", avatar: "https://i.pravatar.cc/36?u=chef2", recipesCount: 28 },
  { id: 3, name: "Maria Doces", avatar: "https://i.pravatar.cc/36?u=chef3", recipesCount: 56 },
];

const SidebarRight: React.FC<SidebarRightProps> = ({ receitas, onSelectRecipe }) => {
  const { showToast } = useToast();
  const [following, setFollowing] = useState<Record<number, boolean>>({});

  const trendingList = [...receitas].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 4);

  const toggleFollow = (id: number) => {
    const isNowFollowing = !following[id];
    setFollowing((prev) => ({ ...prev, [id]: isNowFollowing }));
    if (isNowFollowing) {
      showToast("Você está seguindo este chef!", "success");
    }
  };

  return (
    <aside className="sidebar sidebar-right">
      <div className="trending-section">
        <h4>
          <i className="fas fa-fire-flame-curved"></i> Receitas em Alta
        </h4>
        <ul className="trending-list">
          {trendingList.length === 0 ? (
            <li>
              <div className="trending-info">
                <span>Nenhuma receita no momento</span>
              </div>
            </li>
          ) : (
            trendingList.map((rec, idx) => (
              <li key={rec.id} onClick={() => onSelectRecipe(rec)} style={{ cursor: "pointer" }}>
                <span className="trending-rank">{idx + 1}</span>
                <div className="trending-info">
                  <strong>{rec.titulo}</strong>
                  <span>{rec.likes || 0} curtidas</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="suggested-users">
        <h4>
          <i className="fas fa-user-plus"></i> Sugestões para você
        </h4>
        {INITIAL_SUGGESTED.map((chef) => (
          <div key={chef.id} className="suggested-user">
            <img src={chef.avatar} alt={chef.name} />
            <div className="suggested-info">
              <strong>{chef.name}</strong>
              <span>{chef.recipesCount} receitas</span>
            </div>
            <button
              className="btn-follow"
              onClick={() => toggleFollow(chef.id)}
              style={
                following[chef.id]
                  ? { background: "var(--primary)", color: "white", borderColor: "var(--primary)" }
                  : {}
              }
            >
              {following[chef.id] ? "Seguindo" : "Seguir"}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarRight;
