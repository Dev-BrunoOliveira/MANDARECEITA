import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import type { Receita, RecipeComment } from "../types/recipe";
import { formatarCategoria, getTimeAgo } from "../utils/recipeStorage";

interface CardReceitaProps {
  receita: Receita;
  onViewDetails: (receita: Receita) => void;
  onLike: (id: number) => void;
  onBookmark: (id: number) => void;
  onDelete: (id: number) => void;
  onAddComment: (id: number, comentario: RecipeComment) => void;
}

const CardReceita: React.FC<CardReceitaProps> = ({
  receita,
  onViewDetails,
  onLike,
  onBookmark,
  onDelete,
  onAddComment,
}) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const isMyRecipe = user && receita.nomeChef === user.name;
  const timeAgo = getTimeAgo(receita.timestamp);
  const comentarios = receita.comentarios || [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsMenuOpen(false);
    showToast("Link da receita copiado!", "info");
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    if (window.confirm("Tem certeza que deseja excluir esta receita?")) {
      onDelete(receita.id);
      showToast("Receita excluída", "info");
    }
  };

  const handleSendComment = () => {
    if (!commentText.trim()) return;

    const novoComentario: RecipeComment = {
      id: Date.now(),
      author: user?.name || "Usuário",
      avatar: user?.profilePhoto || "https://i.pravatar.cc/32?u=me",
      text: commentText.trim(),
      timestamp: new Date().toISOString(),
    };

    onAddComment(receita.id, novoComentario);
    setCommentText("");
  };

  return (
    <div className="card-receita">
      {/* Header do Card */}
      <div className="card-user-info">
        <img
          src={receita.avatarUrl || `https://i.pravatar.cc/42?u=${receita.id}`}
          alt={receita.nomeChef}
        />
        <div className="user-details">
          <span className="username">{receita.nomeChef || "Chef Anônimo"}</span>
          <span className="post-time">{timeAgo}</span>
        </div>

        <button
          className="card-menu-btn"
          title="Opções"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <i className="fas fa-ellipsis"></i>
        </button>

        {isMenuOpen && (
          <div className="card-menu-dropdown open" onClick={(e) => e.stopPropagation()}>
            {isMyRecipe && (
              <button className="btn-delete-recipe" onClick={handleDelete}>
                <i className="fas fa-trash-can"></i> Excluir Receita
              </button>
            )}
            <button className="btn-copy-link" onClick={handleCopyLink}>
              <i className="fas fa-link"></i> Copiar Link
            </button>
          </div>
        )}
      </div>

      {/* Imagem da Receita */}
      <div className="card-image" onClick={() => onViewDetails(receita)} style={{ cursor: "pointer" }}>
        <img src={receita.imagemUrl} alt={receita.titulo} loading="lazy" />
      </div>

      {/* Conteúdo do Card */}
      <div className="card-content">
        <h3 onClick={() => onViewDetails(receita)} style={{ cursor: "pointer" }}>
          {receita.titulo}
        </h3>
        <span className="categoria">{formatarCategoria(receita.categoria)}</span>
        {receita.tempoPreparo && (
          <span className="tempo-preparo">
            <i className="fas fa-clock"></i> {receita.tempoPreparo}
          </span>
        )}

        <div className="recipe-details">
          <div className="recipe-section recipe-ingredients">
            <h4>
              <i className="fas fa-list-check"></i> Ingredientes
            </h4>
            <p>{receita.ingredientes}</p>
          </div>
          <div className="recipe-section recipe-preparation">
            <h4>
              <i className="fas fa-fire-burner"></i> Modo de Preparo
            </h4>
            <p>{receita.modoPreparo || "Não informado."}</p>
          </div>
        </div>

        <a
          href="#"
          className="toggle-recipe-link"
          onClick={(e) => {
            e.preventDefault();
            onViewDetails(receita);
          }}
        >
          <i className="fas fa-book-open"></i> Ver receita completa
        </a>
      </div>

      {/* Contadores e Ações */}
      <div className="card-actions">
        <div className="action-counts">
          <span className="like-count">
            {receita.likes || 0} curtida{(receita.likes || 0) !== 1 ? "s" : ""}
          </span>
          <span className="comment-count">
            {comentarios.length} comentário{comentarios.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="action-buttons">
          <button
            className={`action-btn btn-like ${receita.likedByMe ? "liked" : ""}`}
            onClick={() => onLike(receita.id)}
          >
            <i className={`fa${receita.likedByMe ? "s" : "r"} fa-heart`}></i>
            <span>Curtir</span>
          </button>

          <button
            className="action-btn btn-comment"
            onClick={() => setIsCommentSectionOpen(!isCommentSectionOpen)}
          >
            <i className="far fa-comment"></i>
            <span>Comentar</span>
          </button>

          <button
            className={`action-btn btn-bookmark ${receita.bookmarkedByMe ? "bookmarked" : ""}`}
            onClick={() => onBookmark(receita.id)}
          >
            <i className={`fa${receita.bookmarkedByMe ? "s" : "r"} fa-bookmark`}></i>
            <span>{receita.bookmarkedByMe ? "Salvo" : "Salvar"}</span>
          </button>
        </div>
      </div>

      {/* Seção de Comentários */}
      <div className={`comment-section ${isCommentSectionOpen ? "open" : ""}`}>
        <div className="comment-list">
          {comentarios.map((c) => (
            <div key={c.id} className="comment-item">
              <img src={c.avatar || "https://i.pravatar.cc/32?u=" + c.id} alt={c.author} />
              <div className="comment-body">
                <div className="comment-bubble">
                  <strong>{c.author}</strong>
                  <p>{c.text}</p>
                </div>
                <span className="comment-time">{getTimeAgo(c.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="comment-input-wrapper">
          <img src={user?.profilePhoto || "https://i.pravatar.cc/32?u=me"} alt="Você" />
          <input
            type="text"
            placeholder="Escreva um comentário..."
            className="comment-input"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendComment();
            }}
          />
          <button className="comment-send-btn" onClick={handleSendComment}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardReceita;