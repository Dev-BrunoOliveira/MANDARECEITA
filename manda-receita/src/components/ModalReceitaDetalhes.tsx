import { useState } from "react";
import type { Receita } from "../types/recipe";
import "./ModalReceitaDetalhes.css";

interface ModalReceitaDetalhesProps {
  receita: Receita;
  onClose: () => void;
  onLike?: (id: number) => void;
}

const ModalReceitaDetalhes = ({ receita, onClose, onLike }: ModalReceitaDetalhesProps) => {
  const [ingredientesChecados, setIngredientesChecados] = useState<Record<number, boolean>>({});

  const toggleIngrediente = (index: number) => {
    setIngredientesChecados((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Separa lista de ingredientes por quebra de linha ou hífen
  const listaIngredientes = receita.ingredientes
    .split("\n")
    .map((i) => i.replace(/^[-•*]\s*/, "").trim())
    .filter((i) => i.length > 0);

  // Separa passos do modo de preparo por quebra de linha
  const listaPreparo = receita.preparo
    .split("\n")
    .map((p) => p.replace(/^\d+[\.\)]\s*/, "").trim())
    .filter((p) => p.length > 0);

  return (
    <div className="modal-recipe-overlay" onClick={onClose}>
      <div className="modal-recipe-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-recipe-close" onClick={onClose} title="Fechar (Esc)">
          &times;
        </button>

        <div className="modal-recipe-banner">
          <img src={receita.imagem} alt={receita.titulo} className="modal-recipe-img" />
          <div className="modal-recipe-badge-category">{receita.categoria}</div>
        </div>

        <div className="modal-recipe-body">
          <div className="modal-recipe-header">
            <h2 className="modal-recipe-title">{receita.titulo}</h2>

            <div className="modal-recipe-author">
              <img
                src={receita.chefAvatar || "https://i.pravatar.cc/45"}
                alt={receita.chef}
                className="modal-author-avatar"
              />
              <div className="modal-author-info">
                <span className="modal-author-name">{receita.chef}</span>
                <span className="modal-recipe-date">{receita.dataCriacao || "Publicado recentemente"}</span>
              </div>
            </div>
          </div>

          <div className="modal-recipe-stats">
            {receita.tempoPreparo && (
              <div className="stat-pill">
                <span className="stat-icon">⏱️</span>
                <span>{receita.tempoPreparo}</span>
              </div>
            )}
            {receita.porcoes && (
              <div className="stat-pill">
                <span className="stat-icon">🍽️</span>
                <span>{receita.porcoes}</span>
              </div>
            )}
            <div className="stat-pill">
              <span className="stat-icon">❤️</span>
              <span>{receita.curtidas || 0} curtidas</span>
            </div>
          </div>

          <div className="modal-recipe-section">
            <h3>🛒 Ingredientes</h3>
            <p className="modal-section-subtitle">Marque os ingredientes à medida que prepara:</p>
            <ul className="ingredients-checklist">
              {listaIngredientes.map((ing, idx) => (
                <li
                  key={idx}
                  className={`ingredient-item ${ingredientesChecados[idx] ? "checked" : ""}`}
                  onClick={() => toggleIngrediente(idx)}
                >
                  <input
                    type="checkbox"
                    checked={!!ingredientesChecados[idx]}
                    onChange={() => toggleIngrediente(idx)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-recipe-section">
            <h3>👩‍🍳 Modo de Preparo</h3>
            <ol className="steps-list">
              {listaPreparo.map((passo, idx) => (
                <li key={idx} className="step-item">
                  <span className="step-number">{idx + 1}</span>
                  <p className="step-text">{passo}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="modal-recipe-footer">
            <button
              className={`btn-like-modal ${receita.curtidoPeloUsuario ? "liked" : ""}`}
              onClick={() => onLike && onLike(receita.id)}
            >
              {receita.curtidoPeloUsuario ? "❤️ Curtido" : "🤍 Curtir"} ({receita.curtidas || 0})
            </button>
            <button className="btn-close-secondary" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReceitaDetalhes;
