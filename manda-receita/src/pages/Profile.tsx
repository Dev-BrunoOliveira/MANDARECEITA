import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import "./Profile.css";

const Profile = () => {
  const { username } = useParams(); // ✅ AGORA CERTO
  const { user } = useAuth();

  // Se no futuro username !== user.username
  // você vai buscar outro perfil via API

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-container">
        <div className="profile-header">
          
          <div className="profile-cover">
            <img
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
              alt="Capa"
            />
          </div>

          <div className="profile-avatar-bar">
            <div className="profile-avatar-wrapper">
              <img
                src={user?.avatar || "https://via.placeholder.com/150"}
                alt="Avatar"
                className="profile-avatar-img"
              />
            </div>

            <div className="profile-info">
              <div className="profile-text">
                <h1>{user?.name || "Usuário"}</h1>

                <p>
                  Amante da culinária | @{username}
                </p>
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
            </div>
          </aside>

          <main className="profile-feed">
            <h3>Minhas Receitas</h3>

            <div className="no-recipes">
              <p>Você ainda não compartilhou nenhuma receita.</p>
              <button className="btn-post-now">
                Manda sua primeira!
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;