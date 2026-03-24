import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./Home.css";
import CardReceita from "../components/CardReceita";

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
  // Estado para controlar a visibilidade do formulário (Lógica Facebook)
  const [isPostagemAberta, setIsPostagemAberta] = useState(false);

  // Estado para a lista de receitas
  const [receitas, setReceitas] = useState<Receita[]>([
    {
      id: 1,
      chef: "Chef Jacquin",
      titulo: "Pudim de Leite Perfeito",
      categoria: "Doces",
      imagem:
        "https://images.pexels.com/photos/2105104/pexels-photo-2105104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ingredientes:
        "- 1 lata de leite condensado, - 1 lata de leite, - 3 ovos inteiros",
      preparo:
        "1. Bata tudo no liquidificador. 2. Despeje em forma caramelizada. 3. Asse em banho-maria.",
    },
  ]);

  // Estado para o preview da imagem
  const [preview, setPreview] = useState<string | null>(null);

  // Função para processar a imagem selecionada
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Receita enviada com sucesso! (Lógica de salvamento em breve)");

    // Após enviar, fechamos o formulário e limpamos o preview
    setIsPostagemAberta(false);
    setPreview(null);
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
            <li>
              <a href="#">Página Inicial</a>
            </li>
            <li>
              <a href="#">Pratos Principais</a>
            </li>
            <li>
              <a href="#">Mais Receitas</a>
            </li>
          </ul>
        </aside>

        <div className="main-feed">
          {/* --- NOVA LÓGICA DE FORMULÁRIO CONDICIONAL --- */}
          <section className="formulario-receita">
            {/* 1. SE o formulário NÃO estiver aberto, mostramos a "share-box" */}
            {!isPostagemAberta ? (
              <div
                className="share-box"
                onClick={() => setIsPostagemAberta(true)}
              >
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Sua foto"
                  className="user-avatar"
                />
                <div className="fake-input">
                  Compartilhe uma receita, Bruno...
                </div>
              </div>
            ) : (
              // 2. CASO CONTRÁRIO (se estiver aberto), mostramos o formulário completo
              <div className="modal-postagem">
                <div className="modal-header">
                  <h3>Criar Nova Receita</h3>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsPostagemAberta(false)}
                  >
                    ×
                  </button>
                </div>

                <form id="formNovaReceita" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Título da Receita</label>
                    <input
                      type="text"
                      placeholder="Ex: Bolo de Fubá"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Seu Nome</label>
                    <input
                      type="text"
                      placeholder="Ex: Bruno Oliveira"
                      required
                    />
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
                    <textarea
                      rows={4}
                      placeholder="Liste os ingredientes..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Modo de Preparo</label>
                    <textarea
                      rows={4}
                      placeholder="Passo a passo..."
                      required
                    ></textarea>
                  </div>

                  {/* Campo de Upload de Foto */}
                  <div className="form-group">
                    <label htmlFor="fotoReceita">📸 Adicionar Foto</label>
                    <input
                      type="file"
                      id="fotoReceita"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    {/* Preview da Imagem */}
                    {preview && (
                      <div
                        className="image-preview-container"
                        style={{ marginTop: "10px", textAlign: "center" }}
                      >
                        <img
                          src={preview}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setPreview(null)}
                          style={{
                            display: "block",
                            color: "red",
                            margin: "5px auto",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Remover foto
                        </button>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn-enviar">
                    Publicar Receita
                  </button>
                </form>
              </div>
            )}
          </section>

          {/* Feed de Receitas */}
          <section className="feed-receitas">
            <h2>Receitas Recentes</h2>
            <div className="container-receitas">
              {receitas.map((rec) => (
                <CardReceita key={rec.id} {...rec} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Direita */}
        <aside className="sidebar sidebar-right">
          <h3>Receitas em Alta</h3>
          <ul>
            <li>
              <a href="#">Bolo de Chocolate</a>
            </li>
            <li>
              <a href="#">Pipoca Gourmet</a>
            </li>
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
