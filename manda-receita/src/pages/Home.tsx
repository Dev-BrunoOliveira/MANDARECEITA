import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import CardReceita from "../components/CardReceita";
import ModalReceitaDetalhes from "../components/ModalReceitaDetalhes";
import { useAuth } from "../context/AuthContext";
import type { Receita } from "../types/recipe";
import {
  getReceitasSalvas,
  salvarReceitaStorage,
  toggleCurtidaStorage,
} from "../utils/recipeStorage";

const Home = () => {
  const { user } = useAuth();
  const [isPostagemAberta, setIsPostagemAberta] = useState(false);
  const [isMenuAberto, setIsMenuAberto] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // Estados do Formulário de Criação
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("Salgados");
  const [novosIngredientes, setNovosIngredientes] = useState("");
  const [novoPreparo, setNovoPreparo] = useState("");
  const [novoTempoPreparo, setNovoTempoPreparo] = useState("");
  const [novasPorcoes, setNovasPorcoes] = useState("");

  // Estado das Receitas e Modal de Detalhes
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);

  useEffect(() => {
    const salvas = getReceitasSalvas();
    setReceitas(salvas);
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!novoTitulo.trim() || !novosIngredientes.trim() || !novoPreparo.trim()) {
      alert("Por favor, preencha o título, os ingredientes e o modo de preparo!");
      return;
    }

    const novaRec: Receita = {
      id: Date.now(),
      chef: user?.name || "Chef Convidado",
      chefAvatar: user?.avatar || "https://i.pravatar.cc/45",
      titulo: novoTitulo.trim(),
      categoria: novaCategoria,
      imagem: preview || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      ingredientes: novosIngredientes.trim(),
      preparo: novoPreparo.trim(),
      tempoPreparo: novoTempoPreparo.trim() || "30 min",
      porcoes: novasPorcoes.trim() || "4 porções",
      curtidas: 0,
      curtidoPeloUsuario: false,
      dataCriacao: "Agora mesmo",
    };

    const atualizadas = salvarReceitaStorage(novaRec);
    setReceitas(atualizadas);

    setIsPostagemAberta(false);
    setPreview(null);
    setNovoTitulo("");
    setNovosIngredientes("");
    setNovoPreparo("");
    setNovoTempoPreparo("");
    setNovasPorcoes("");
  };

  const handleToggleLike = (id: number) => {
    const atualizadas = toggleCurtidaStorage(id);
    setReceitas(atualizadas);

    // Se o modal estiver aberto com essa receita, atualiza o modal também
    if (receitaSelecionada && receitaSelecionada.id === id) {
      const encontrada = atualizadas.find((r) => r.id === id);
      if (encontrada) setReceitaSelecionada(encontrada);
    }
  };

  return (
    <div className="home-container">
      <header className="main-header">
        <div className="header-content">
          <h1>Manda Receita</h1>

          <button className="menu-hamburger" onClick={() => setIsMenuAberto(!isMenuAberto)}>
            <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
            <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
            <span className={`bar ${isMenuAberto ? "open" : ""}`}></span>
          </button>

          <nav className={`header-nav ${isMenuAberto ? "active" : ""}`}>
            <div className="nav-links">
              <Link to="/principal">Página Inicial</Link>
              <a href="#receitas">Explorar Receitas</a>
              <a href="#alta">Mais Curtidas</a>
            </div>

            <Link
              to={user?.isProfileCompleted && user?.username ? `/user/${user.username}` : "/setup-profile"}
              className="nav-user"
            >
              <span>{user?.name || "Meu Perfil"}</span>
              <img
                src={user?.avatar || "https://i.pravatar.cc/40"}
                alt="Avatar"
                className="nav-avatar"
              />
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-layout">
        <div className="main-feed">
          <section className="formulario-receita">
            {!isPostagemAberta ? (
              <div className="share-box" onClick={() => setIsPostagemAberta(true)}>
                <img
                  src={user?.avatar || "https://i.pravatar.cc/40"}
                  alt="Sua foto"
                  className="user-avatar"
                />
                <div className="fake-input">
                  O que vamos cozinhar hoje, {user?.name?.split(" ")[0] || "Chef"}? 🍳
                </div>
              </div>
            ) : (
              <div className="modal-postagem">
                <div className="modal-header">
                  <h3>✨ Compartilhe sua Receita</h3>
                  <button type="button" className="btn-close" onClick={() => setIsPostagemAberta(false)}>
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Título da Receita *</label>
                    <input
                      type="text"
                      value={novoTitulo}
                      onChange={(e) => setNovoTitulo(e.target.value)}
                      placeholder="Ex: Strogonoff de Frango Cremoso"
                      required
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Categoria</label>
                      <select value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)}>
                        <option value="Salgados">Salgados</option>
                        <option value="Doces">Doces</option>
                        <option value="Sobremesas">Sobremesas</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Fit / Leve">Fit / Leve</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Tempo Estimado</label>
                      <input
                        type="text"
                        value={novoTempoPreparo}
                        onChange={(e) => setNovoTempoPreparo(e.target.value)}
                        placeholder="Ex: 40 min"
                      />
                    </div>

                    <div className="form-group">
                      <label>Rendimento</label>
                      <input
                        type="text"
                        value={novasPorcoes}
                        onChange={(e) => setNovasPorcoes(e.target.value)}
                        placeholder="Ex: 4 porções"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Ingredientes * (um por linha)</label>
                    <textarea
                      rows={4}
                      value={novosIngredientes}
                      onChange={(e) => setNovosIngredientes(e.target.value)}
                      placeholder="500g de peito de frango em cubos&#10;1 lata de creme de leite&#10;2 colheres de ketchup"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Modo de Preparo * (passo a passo)</label>
                    <textarea
                      rows={5}
                      value={novoPreparo}
                      onChange={(e) => setNovoPreparo(e.target.value)}
                      placeholder="1. Em uma panela, doure a cebola e o alho.&#10;2. Adicione o frango e frite até dourar.&#10;3. Misture o creme de leite e sirva."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fotoReceita" className="btn-add-foto">
                      📸 Selecionar Foto do Prato
                    </label>
                    <input type="file" id="fotoReceita" accept="image/*" onChange={handleImageChange} hidden />
                    {preview && (
                      <div className="image-preview-container">
                        <img src={preview} alt="Preview" className="img-preview-feed" />
                        <button type="button" onClick={() => setPreview(null)} className="btn-remove">
                          Remover foto
                        </button>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn-enviar">
                    Publicar Receita no Feed 🚀
                  </button>
                </form>
              </div>
            )}
          </section>

          <section className="feed-receitas" id="receitas">
            <h2>Receitas da Comunidade ({receitas.length})</h2>
            <div className="container-receitas">
              {receitas.map((rec) => (
                <CardReceita
                  key={rec.id}
                  receita={rec}
                  onViewDetails={(r) => setReceitaSelecionada(r)}
                  onLike={handleToggleLike}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="sidebar sidebar-right">
          <h3>🔥 Destaques da Semana</h3>
          <ul>
            {receitas.slice(0, 3).map((r) => (
              <li key={r.id}>
                <a href="#receitas" onClick={() => setReceitaSelecionada(r)}>
                  {r.titulo}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </main>

      {/* Modal de Detalhes da Receita */}
      {receitaSelecionada && (
        <ModalReceitaDetalhes
          receita={receitaSelecionada}
          onClose={() => setReceitaSelecionada(null)}
          onLike={handleToggleLike}
        />
      )}
    </div>
  );
};

export default Home;