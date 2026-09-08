import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import CardReceita from "../components/CardReceita";
import ModalReceitaDetalhes from "../components/ModalReceitaDetalhes";
import type { Receita } from "../types/recipe";
import { getReceitasSalvas, toggleCurtidaStorage } from "../utils/recipeStorage";
import "./Profile.css";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [minhasReceitas, setMinhasReceitas] = useState<Receita[]>([]);
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);

  useEffect(() => {
    const todas = getReceitasSalvas();
    // Filtra as receitas criadas pelo usuário logado
    if (user?.name) {
      const filtradas = todas.filter(
        (r) => r.chef.toLowerCase() === user.name.toLowerCase()
      );
      setMinhasReceitas(filtradas);
    }
  }, [user]);

  const handleToggleLike = (id: number) => {
    const atualizadas = toggleCurtidaStorage(id);
    if (user?.name) {
      setMinhasReceitas(atualizadas.filter((r) => r.chef.toLowerCase() === user.name.toLowerCase()));
    }
    if (receitaSelecionada && receitaSelecionada.id === id) {
      const encontrada = atualizadas.find((r) => r.id === id);
      if (encontrada) setReceitaSelecionada(encontrada);
    }
  };

  const hasAvatar = !!(
    user?.avatar &&
    typeof user.avatar === "string" &&
    !user.avatar.includes("placeholder") &&
    user.avatar.trim() !== ""
  );

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-container">
        <div className="profile-header">
          {/* Capa */}
          <div className="profile-cover">
            {user?.cover ? (
              <img src={user.cover} alt="Capa do perfil" />
            ) : (
              <div className="profile-cover-empty"></div>
            )}
          </div>

          <div className="profile-avatar-bar">
            <div className="profile-avatar-wrapper">
              {hasAvatar ? (
                <img
                  src={user?.avatar || ""}
                  alt={`Foto de ${user?.name}`}
                  className="profile-avatar-img"
                />
              ) : (
                <div className="avatar-empty-state">
                  <span>{user?.name?.charAt(0).toUpperCase() || "U"}</span>
                </div>
              )}
            </div>

            <div className="profile-info">
              <div className="profile-text">
                <h1>{user?.name || "Usuário"}</h1>
                <p>@{username || user?.username || "usuario"}</p>
              </div>
              <button className="btn-edit" onClick={() => navigate("/setup-profile")}>
                ✏️ Editar Perfil
              </button>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="profile-content">
          <aside className="profile-sidebar">
            <div className="profile-stats">
              <h4>Atividade</h4>
              <p><span>{minhasReceitas.length}</span> Receitas</p>
              <p><span>1</span> Seguidores</p>
              <p><span>0</span> Seguindo</p>
            </div>
          </aside>

          <main className="profile-feed">
            <h3>Minhas Receitas ({minhasReceitas.length})</h3>

            {minhasReceitas.length === 0 ? (
              <div className="no-recipes">
                <p>Você ainda não compartilhou nenhuma receita.</p>
                <Link to="/principal" className="btn-post-now">
                  Manda sua primeira! 🍳
                </Link>
              </div>
            ) : (
              <div className="container-receitas">
                {minhasReceitas.map((rec) => (
                  <CardReceita
                    key={rec.id}
                    receita={rec}
                    onViewDetails={(r) => setReceitaSelecionada(r)}
                    onLike={handleToggleLike}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {receitaSelecionada && (
        <ModalReceitaDetalhes
          receita={receitaSelecionada}
          onClose={() => setReceitaSelecionada(null)}
          onLike={handleToggleLike}
        />
      )}
    </div>
  );
};

export default Profile;