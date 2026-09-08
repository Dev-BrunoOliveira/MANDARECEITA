import React, { useState } from "react";
import type { Receita } from "../types/recipe";
import { formatarCategoria, getTimeAgo } from "../utils/recipeStorage";
import { useToast } from "../hooks/useToast";

interface RecipeDetailModalProps {
  receita: Receita | null;
  onClose: () => void;
}

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ receita, onClose }) => {
  const { showToast } = useToast();
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  if (!receita) return null;

  const ingredientesLinhas = (receita.ingredientes || "")
    .split("\n")
    .map((i) => i.replace(/^[-•*]\s*/, "").trim())
    .filter((i) => i.length > 0);

  const passosPreparo = (receita.modoPreparo || "")
    .split("\n")
    .map((p) => p.replace(/^\d+[.)]\s*/, "").trim())
    .filter((p) => p.length > 0);

  const handleToggleCheck = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleCopyIngredients = () => {
    if (receita.ingredientes) {
      navigator.clipboard.writeText(receita.ingredientes);
      showToast("Lista de ingredientes copiada!", "success");
    }
  };

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-recipe-detail">
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-xmark"></i>
        </button>

        <div className="recipe-detail-banner">
          <img src={receita.imagemUrl} alt={receita.titulo} />
          <span className="detail-category-badge">
            {formatarCategoria(receita.categoria) || "Geral"}
          </span>
        </div>

        <div className="recipe-detail-body">
          <h2>{receita.titulo}</h2>

          <div className="detail-author-bar">
            <img src={receita.avatarUrl} alt={receita.nomeChef} />
            <div className="detail-author-info">
              <strong>{receita.nomeChef || "Chef Anônimo"}</strong>
              <span>{getTimeAgo(receita.timestamp)}</span>
            </div>
          </div>

          <div className="detail-stats-bar">
            <span>
              <i className="fas fa-clock"></i> {receita.tempoPreparo || "30 min"}
            </span>
            <span>
              <i className="fas fa-heart"></i> {receita.likes || 0} curtidas
            </span>
          </div>

          <div className="detail-section">
            <h3>
              <i className="fas fa-list-check"></i> Ingredientes
            </h3>
            <p className="detail-hint">Marque os ingredientes à medida que separa na cozinha:</p>

            <div className="checklist-container">
              {ingredientesLinhas.length === 0 ? (
                <p>Nenhum ingrediente especificado.</p>
              ) : (
                ingredientesLinhas.map((ing, idx) => (
                  <label
                    key={idx}
                    className={`checklist-item ${checkedIngredients[idx] ? "checked" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedIngredients[idx]}
                      onChange={() => handleToggleCheck(idx)}
                    />
                    <span>{ing}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="detail-section">
            <h3>
              <i className="fas fa-fire-burner"></i> Modo de Preparo
            </h3>

            <div className="steps-container">
              {passosPreparo.length === 0 ? (
                <p>Nenhum modo de preparo informado.</p>
              ) : (
                passosPreparo.map((passo, idx) => (
                  <div key={idx} className="step-card">
                    <span className="step-num">{idx + 1}</span>
                    <p className="step-text">{passo}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn-detail-action" onClick={handleCopyIngredients}>
              <i className="fas fa-copy"></i> Copiar Ingredientes
            </button>
            <button className="btn-detail-action primary" onClick={onClose}>
              <i className="fas fa-check"></i> Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;
