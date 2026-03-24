import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  // Estado para armazenar as receitas (começa com o Pudim do Jacquin)
  const [receitas, setReceitas] = useState([
    {
      id: 1,
      chef: "Chef Jacquin",
      titulo: "Pudim de Leite Perfeito",
      categoria: "Doces",
      imagem: "https://images.pexels.com/photos/2105104/pexels-photo-2105104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ingredientes: "- 1 lata de leite condensado, - 1 lata de leite, - 3 ovos inteiros",
      preparo: "1. Bata tudo no liquidificador. 2. Despeje em forma caramelizada. 3. Asse em banho-maria."
    }
  ]);

  return (
    <div className="home-container">
      <header>
        <h1>Manda Receita</h1>
      </header>

      <main className="main-layout">
        {/* Sidebar Esquerda */}
        <aside className="sidebar sidebar-left">
          <h3>Navegação</h3>
          <ul>
            <li><a href="#">Página Inicial</a></li>
            <li><a href="#">Pratos Principais</a></li>
            <li><a href="#">Mais Receitas</a></li>
          </ul>
        </aside>

        <div className="main-feed">
          {/* Formulário de Nova Receita */}
          <section className="formulario-receita">
            <h2>Adicionar Nova Receita</h2>
            <form id="formNovaReceita">
              <div className="form-group">
                <label>Título da Receita</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Seu Nome</label>
                <input type="text" placeholder="Ex: Ana Maria" required />
              </div>
              <div className="form-group">
                <label>Selecione a Categoria</label>
                <select>
                  <option value="salgados">Salgados</option>
                  <option value="doces">Doces</option>
                  <option value="sobremesas">Sobremesas</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ingredientes</label>
                <textarea rows="4" required></textarea>
              </div>
              <div className="form-group">
                <label>Modo de Preparo</label>
                <textarea rows="4" required></textarea>
              </div>
              <button type="submit" className="btn-enviar">Envie a Receita</button>
            </form>
          </section>

          {/* Feed de Receitas */}
          <section className="feed-receitas">
            <h2>Receitas Recentes</h2>
            <div className="container-receitas">
              {receitas.map((rec) => (
                <div key={rec.id} className="card-receita">
                  <div className="card-user-info">
                    <img src="https://i.pravatar.cc/40" alt="Avatar" />
                    <span className="username">{rec.chef}</span>
                  </div>
                  <img src={rec.imagem} alt={rec.titulo} />
                  <div className="card-content">
                    <h3>{rec.titulo}</h3>
                    <p className="categoria">{rec.categoria}</p>
                    <button className="toggle-recipe-link">Veja a receita completa</button>
                  </div>
                  <div className="card-actions">
                    <button>👍 Curtir</button>
                    <button>💬 Comentar</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Direita */}
        <aside className="sidebar sidebar-right">
          <h3>Receitas em Alta</h3>
          <ul>
            <li><a href="#">Bolo de Chocolate</a></li>
            <li><a href="#">Pipoca Gourmet</a></li>
          </ul>
        </aside>
      </main>

      <footer>
        <p>&copy; 2026 Manda Receita. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;