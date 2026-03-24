import React, { useState } from 'react';
import './Home.css';
import CardReceita from '../components/CardReceita'; // 1. Importando o componente novo

interface Receita {
  id: number;
  chef: string;
  titulo: string;
  categoria: string;
  imagem: string;
  ingredientes: string;
  preparo: string;
}

const Home = () => {
  const [receitas, setReceitas] = useState<Receita[]>([
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

  // Função para lidar com o envio do formulário (Lógica de ADS)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Receita enviada com sucesso! (Lógica de salvamento em breve)");
    // Aqui depois faremos a função para dar o setReceitas([...receitas, novaReceita])
  };

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
            <form id="formNovaReceita" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título da Receita</label>
                <input type="text" placeholder="Ex: Bolo de Fubá" required />
              </div>
              <div className="form-group">
                <label>Seu Nome</label>
                <input type="text" placeholder="Ex: Bruno Oliveira" required />
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
                <textarea rows={4} placeholder="Liste os ingredientes..." required></textarea>
              </div>
              <div className="form-group">
                <label>Modo de Preparo</label>
                <textarea rows={4} placeholder="Passo a passo..." required></textarea>
              </div>
              <button type="submit" className="btn-enviar">Envie a Receita</button>
            </form>
          </section>

          {/* Feed de Receitas */}
          <section className="feed-receitas">
            <h2>Receitas Recentes</h2>
            <div className="container-receitas">
              {/* 2. Renderizando o componente CardReceita para cada item da lista */}
              {receitas.map((rec) => (
                <CardReceita 
                  key={rec.id} 
                  id={rec.id}
                  chef={rec.chef}
                  titulo={rec.titulo}
                  categoria={rec.categoria}
                  imagem={rec.imagem}
                  ingredientes={rec.ingredientes}
                  preparo={rec.preparo}
                />
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