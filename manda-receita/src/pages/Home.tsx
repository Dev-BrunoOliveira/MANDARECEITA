import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom"; 
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
  const [isPostagemAberta, setIsPostagemAberta] = useState(false);
  const [isMenuAberto, setIsMenuAberto] = useState(false); // Estado para o Menu Hambúrguer
  const [preview, setPreview] = useState<string | null>(null);

  const [receitas, setReceitas] = useState<Receita[]>([
    {
      id: 1,
      chef: "Chef Erick Jacquin",
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Receita enviada com sucesso!");
    setIsPostagemAberta(false);
    setPreview(null);
  };

  return (
    <div className="home-container">
      {/* --- NAVBAR SUPERIOR --- */}
      <header className="main-header">
        <div className="header-content">
          <h1>Manda Receita</h1>

          {/* Botão Hambúrguer (Aparece via CSS no Mobile) */}
          <button 
            className="menu-hamburger" 
            onClick={() => setIsMenuAberto(!isMenuAberto)}
            aria-label="Abrir menu"
          >
            <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
            <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
            <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
          </button>
          
          <nav className={`header-nav ${isMenuAberto ? "active" : ""}`}>
            <div className="nav-links">
              <Link to="/principal" onClick={() => setIsMenuAberto(false)}>Página Inicial</Link>
              <a href="#" onClick={() => setIsMenuAberto(false)}>Pratos Principais</a>
              <a href="#" onClick={() => setIsMenuAberto(false)}>Mais Receitas</a>
            </div>

            <Link to="/setup-profile" className="nav-user" onClick={() => setIsMenuAberto(false)}>
              <span>Meu Perfil</span>
              <img
                src="https://i.pravatar.cc/40"
                alt="Avatar"
                className="nav-avatar"
              />
            </Link>
          </nav>
        </div>
      </header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="main-layout">
        {/* Sidebar esquerda removida (links agora estão no Header) */}

        <div className="main-feed">
          <section className="formulario-receita">
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

                  <div className="form-group">
                    <label htmlFor="fotoReceita">📸 Adicionar Foto</label>
                    <input type="file" id="fotoReceita" accept="image/*" onChange={handleImageChange} />
                    {preview && (
                      <div className="image-preview-container" style={{ marginTop: "10px", textAlign: "center" }}>
                        <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px", border: "1px solid #ddd" }} />
                        <button type="button" onClick={() => setPreview(null)} style={{ display: "block", color: "red", margin: "5px auto", background: "none", border: "none", cursor: "pointer" }}>
                          Remover foto
                        </button>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn-enviar">Publicar Receita</button>
                </form>
              </div>
            )}
          </section>

          <section className="feed-receitas">
            <h2>Receitas Recentes</h2>
            <div className="container-receitas">
              {receitas.map((rec) => (
                <CardReceita key={rec.id} {...rec} />
              ))}
            </div>
          </section>
        </div>

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