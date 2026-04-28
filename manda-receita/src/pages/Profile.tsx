import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import "./Profile.css";

const Profile = () => {
  const { username } = useParams();
  const { user } = useAuth();

  // Lógica para decidir se mostramos a foto ou o estado vazio
  // Usamos 'as string' para o TS entender que estamos tratando o valor
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
                <p>@{username || "usuario"}</p>
              </div>
              <button className="btn-edit">Editar Perfil</button>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="profile-content">
          <aside className="profile-sidebar">
            <div className="profile-stats">
              <h4>Atividade</h4>
              <p><span>0</span> Receitas</p>
              <p><span>0</span> Seguidores</p>
              <p><span>0</span> Seguindo</p>
            </div>
          </aside>

          <main className="profile-feed">
            <h3>Minhas Receitas</h3>
            <div className="no-recipes">
              <p>Você ainda não compartilhou nenhuma receita.</p>
              <button className="btn-post-now">Manda sua primeira!</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;