import type { Receita } from "../types/recipe";
import "./CardReceita.css";

interface CardReceitaProps {
  receita: Receita;
  onViewDetails: (receita: Receita) => void;
  onLike?: (id: number) => void;
}

const CardReceita = ({ receita, onViewDetails, onLike }: CardReceitaProps) => {
  const {
    id,
    chef,
    chefAvatar,
    titulo,
    categoria,
    imagem,
    tempoPreparo,
    porcoes,
    curtidas = 0,
    curtidoPeloUsuario = false,
  } = receita;

  return (
    <div className="card-receita">
      <div className="card-user-info">
        <img
          src={chefAvatar || "https://i.pravatar.cc/40"}
          alt={chef}
          className="card-user-avatar"
        />
        <div className="card-user-meta">
          <span className="username">{chef}</span>
          <span className="recipe-tag-category">{categoria}</span>
        </div>
      </div>

      <div className="card-image-container" onClick={() => onViewDetails(receita)}>
        <img src={imagem} alt={titulo} className="recipe-image" />
        {tempoPreparo && <span className="badge-time">⏱️ {tempoPreparo}</span>}
      </div>

      <div className="card-content">
        <h3 onClick={() => onViewDetails(receita)} className="card-title-clickable">
          {titulo}
        </h3>

        <div className="card-quick-meta">
          {porcoes && <span className="meta-item">🍽️ {porcoes}</span>}
        </div>

        <button className="toggle-recipe-link" onClick={() => onViewDetails(receita)}>
          📖 Veja a receita completa →
        </button>
      </div>

      <div className="card-actions">
        <button
          className={`btn-action btn-like ${curtidoPeloUsuario ? "liked" : ""}`}
          onClick={() => onLike && onLike(id)}
        >
          {curtidoPeloUsuario ? "❤️" : "🤍"} {curtidas} {curtidas === 1 ? "Curtida" : "Curtidas"}
        </button>

        <button className="btn-action" onClick={() => onViewDetails(receita)}>
          💬 Detalhes
        </button>
      </div>
    </div>
  );
};

export default CardReceita;