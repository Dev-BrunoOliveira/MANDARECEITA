import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Usamos seu AuthContext
import Header from "../components/Header";
import "./Profile.css"; // Vamos criar este arquivo

const Profile = () => {
  const { id } = useParams(); // Pega o ID da URL se precisar buscar dados específicos
  const { user } = useAuth(); // Pega o usuário logado para mostrar os dados dele

  // No futuro, se id !== user.id, você buscaria os dados de outro usuário via API
  
  return (
    <div className="profile-page">
      <Header />
      
      <div className="profile-container">
        {/* --- CABEÇALHO DO PERFIL --- */}
        <div className="profile-header">
          {/* Capa */}
          <div className="profile-cover">
            <img 
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" 
              alt="Capa de perfil" 
            />
          </div>

          {/* Área da foto e info */}
          <div className="profile-avatar-bar">
            <div className="profile-avatar-wrapper">
              <img 
                src={user?.avatar || "https://via.placeholder.com/150"} 
                alt="Foto de Perfil" 
                className="profile-avatar-img"
              />
            </div>
            
            <div className="profile-info">
              <div className="profile-text">
                <h1>{user?.name || "Usuário Anonimo"}</h1>
                <p>Amante da culinária | @{user?.name?.toLowerCase().replace(/\s+/g, '_') || "chef_bruno"}</p>
              </div>
              <button className="btn-edit">Editar Perfil</button>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* --- CONTEÚDO PRINCIPAL (FEED DE RECEITAS DELA) --- */}
        <div className="profile-content">
          <aside className="profile-sidebar">
            <div className="profile-stats">
              <h4>Atividade</h4>
              <p><span>0</span> Receitas compartilhadas</p>
              <p><span>0</span> Seguidores</p>
            </div>
          </aside>

          <main className="profile-feed">
            <h3>Minhas Receitas</h3>
            {/* Aqui você faria o .map igual ao da Home, mas filtrando pelas suas */}
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