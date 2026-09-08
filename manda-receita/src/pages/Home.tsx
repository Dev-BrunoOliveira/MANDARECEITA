import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import CardReceita from "../components/CardReceita";
import RecipeModal from "../components/RecipeModal";
import RecipeDetailModal from "../components/RecipeDetailModal";
import ProfileModal from "../components/ProfileModal";
import SettingsModal from "../components/SettingsModal";

import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import type { Receita, RecipeComment } from "../types/recipe";
import {
  getReceitasSalvas,
  salvarReceitaStorage,
  deletarReceitaStorage,
  toggleCurtidaStorage,
  toggleBookmarkStorage,
  adicionarComentarioStorage,
} from "../utils/recipeStorage";

const Home: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [receitas, setReceitas] = useState<Receita[]>(() => getReceitasSalvas());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  // Modals state
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<Receita | null>(null);

  // Keyboard shortcut for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsRecipeModalOpen(false);
        setIsProfileModalOpen(false);
        setIsSettingsModalOpen(false);
        setSelectedRecipeDetail(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRecipeCreated = (nova: Receita) => {
    const atualizadas = salvarReceitaStorage(nova);
    setReceitas(atualizadas);
  };

  const handleLike = (id: number) => {
    const atualizadas = toggleCurtidaStorage(id);
    setReceitas(atualizadas);

    if (selectedRecipeDetail && selectedRecipeDetail.id === id) {
      const rec = atualizadas.find((r) => r.id === id);
      if (rec) setSelectedRecipeDetail(rec);
    }
  };

  const handleBookmark = (id: number) => {
    const rec = receitas.find((r) => r.id === id);
    const wasSaved = rec?.bookmarkedByMe;
    const atualizadas = toggleBookmarkStorage(id);
    setReceitas(atualizadas);

    if (!wasSaved) {
      showToast("Receita salva nos seus favoritos!", "success");
    } else {
      showToast("Receita removida dos salvos", "info");
    }
  };

  const handleDelete = (id: number) => {
    const atualizadas = deletarReceitaStorage(id);
    setReceitas(atualizadas);
  };

  const handleAddComment = (id: number, comentario: RecipeComment) => {
    const atualizadas = adicionarComentarioStorage(id, comentario);
    setReceitas(atualizadas);

    if (selectedRecipeDetail && selectedRecipeDetail.id === id) {
      const rec = atualizadas.find((r) => r.id === id);
      if (rec) setSelectedRecipeDetail(rec);
    }
  };

  // Filter & Search Logic
  let receitasFiltradas = [...receitas];

  if (activeFilter === "em-alta") {
    receitasFiltradas.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  } else if (activeFilter === "salvos") {
    receitasFiltradas = receitasFiltradas.filter((r) => r.bookmarkedByMe);
  } else if (activeFilter === "recentes") {
    receitasFiltradas.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  if (activeCategory !== "all") {
    receitasFiltradas = receitasFiltradas.filter(
      (r) => r.categoria.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  if (searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    receitasFiltradas = receitasFiltradas.filter(
      (r) =>
        r.titulo.toLowerCase().includes(q) ||
        r.nomeChef.toLowerCase().includes(q) ||
        r.categoria.toLowerCase().includes(q)
    );
  }

  return (
    <div className="home-page-wrapper">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenEditProfile={() => setIsProfileModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      <main>
        <SidebarLeft
          receitas={receitas}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <div className="main-feed">
          {/* Create Post Box */}
          <div className="create-post-box">
            <div className="create-post-header">
              <img
                src={user?.profilePhoto || "https://i.pravatar.cc/40?u=me"}
                alt="Sua foto"
                className="create-post-avatar"
              />
              <button
                className="create-post-trigger"
                onClick={() => setIsRecipeModalOpen(true)}
              >
                <span>Compartilhe uma receita...</span>
              </button>
            </div>
            <div className="create-post-actions">
              <button
                className="create-action-btn"
                onClick={() => setIsRecipeModalOpen(true)}
              >
                <i className="fas fa-image" style={{ color: "#2ecc71" }}></i>
                <span>Foto</span>
              </button>
              <button
                className="create-action-btn"
                onClick={() => setIsRecipeModalOpen(true)}
              >
                <i className="fas fa-utensils" style={{ color: "#e67e22" }}></i>
                <span>Receita</span>
              </button>
            </div>
          </div>

          {/* Feed Container */}
          <section className="feed-receitas">
            {receitasFiltradas.length === 0 ? (
              <div className="feed-empty">
                <i className="fas fa-seedling"></i>
                <h3>Nenhuma receita encontrada</h3>
                <p>Tente alterar o filtro ou seja o primeiro a compartilhar uma receita!</p>
              </div>
            ) : (
              <div className="container-receitas">
                {receitasFiltradas.map((rec) => (
                  <CardReceita
                    key={rec.id}
                    receita={rec}
                    onViewDetails={(r) => setSelectedRecipeDetail(r)}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    onDelete={handleDelete}
                    onAddComment={handleAddComment}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        <SidebarRight
          receitas={receitas}
          onSelectRecipe={(r) => setSelectedRecipeDetail(r)}
        />
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">Manda Receita</div>
          <p>&copy; 2026 Manda Receita. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="#">Sobre</a>
            <a href="#">Privacidade</a>
            <a href="#">Termos</a>
            <a href="#">Contato</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RecipeModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        onRecipeCreated={handleRecipeCreated}
      />

      <RecipeDetailModal
        receita={selectedRecipeDetail}
        onClose={() => setSelectedRecipeDetail(null)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
};

export default Home;