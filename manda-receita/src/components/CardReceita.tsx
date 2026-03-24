import React from 'react';
import './CardReceita.css'; // Vamos criar esse CSS já já

// 1. Definimos o "molde" do que o Card precisa receber para funcionar
interface CardReceitaProps {
  id: number;
  chef: string;
  titulo: string;
  categoria: string;
  imagem: string;
  ingredientes: string;
  preparo: string;
}

const CardReceita = ({ id, chef, titulo, categoria, imagem }: CardReceitaProps) => {
  return (
    <div className="card-receita">
      <div className="card-user-info">
        <img src="https://i.pravatar.cc/40" alt="Avatar" />
        <span className="username">{chef}</span>
      </div>
      
      <img src={imagem} alt={titulo} className="recipe-image" />
      
      <div className="card-content">
        <h3>{titulo}</h3>
        <p className="categoria">{categoria}</p>
        
        {/* Futuramente podemos adicionar a lógica para mostrar ingredientes/preparo */}
        <button className="toggle-recipe-link">Veja a receita completa</button>
      </div>
      
      <div className="card-actions">
        <button className="btn-action">👍 Curtir</button>
        <button className="btn-action">💬 Comentar</button>
      </div>
    </div>
  );
};

export default CardReceita;