import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ usuario, titulo, categoria, imagem }) => {
  return (
    <div className="recipe-card">
      <div className="card-header">
        <div className="user-avatar"></div>
        <span>{usuario}</span>
      </div>
      
      <img src={imagem} alt={titulo} className="recipe-image" />
      
      <div className="card-content">
        <h3>{titulo}</h3>
        <p className="category">{categoria}</p>
        
        <div className="card-actions">
          <button className="btn-action">👍 Curtir</button>
          <button className="btn-action">💬 Comentar</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;