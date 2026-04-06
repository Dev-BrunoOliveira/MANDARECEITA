import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom"; 
import "./Home.css";
import CardReceita from "../components/CardReceita";
import { useAuth } from "../context/AuthContext"; 


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
  const { user } = useAuth(); 
  const [isPostagemAberta, setIsPostagemAberta] = useState(false);
  const [isMenuAberto, setIsMenuAberto] = useState(false); 
  const [preview, setPreview] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("salgados");
  const [novosIngredientes, setNovosIngredientes] = useState("");
  const [novoPreparo, setNovoPreparo] = useState("");

  const [receitas, setReceitas] = useState<Receita[]>([
    {
      id: 1,
      chef: "Chef Erick Jacquin",
      titulo: "Pudim de Leite",
      categoria: "Doces",
      imagem: "https://images.pexels.com/photos/2105104/pexels-photo-2105104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ingredientes: "- 1 lata de leite condensado, - 1 lata de leite, - 3 ovos inteiros",
      preparo: "1. Bata tudo no liquidificador. 2. Despeje em forma caramelizada. 3. Asse em banho-maria.",
    },
  ]);

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

    const novaRec: Receita = {
      id: Date.now(), 
      chef: user?.name || "Usuário Anonimo",
      titulo: novoTitulo,
      categoria: novaCategoria,
      imagem: preview || "https://via.placeholder.com/300",
      ingredientes: novosIngredientes,
      preparo: novoPreparo
    };

    setReceitas([novaRec, ...receitas]);
    
    setIsPostagemAberta(false);
    setPreview(null);
    setNovoTitulo("");
    setNovosIngredientes("");
    setNovoPreparo("");
    
    alert("Receita publicada com sucesso!");
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
              <a href="#">Receitas Prontas</a>
              <a href="#">Minhas Receitas</a>
              <a href="#">Food Veggie</a>
            </div>

            <Link to="/setup-profile" className="nav-user">
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
                  O que vamos cozinhar hoje, {user?.name?.split(' ')[0] || "Chef"}?
                </div>
              </div>
            ) : (
              <div className="modal-postagem">
                <div className="modal-header">
                  <h3>Criar Nova Receita</h3>
                  <button type="button" className="btn-close" onClick={() => setIsPostagemAberta(false)}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Título da Receita</label>
                    <input 
                        type="text" 
                        value={novoTitulo} 
                        onChange={(e) => setNovoTitulo(e.target.value)} 
                        placeholder="Ex: Bolo de Fubá" 
                        required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Selecione a Categoria</label>
                    <select value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)}>
                      <option value="salgados">Salgados</option>
                      <option value="doces">Doces</option>
                      <option value="sobremesas">Sobremesas</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Ingredientes</label>
                    <textarea 
                        rows={3} 
                        value={novosIngredientes} 
                        onChange={(e) => setNovosIngredientes(e.target.value)} 
                        placeholder="Liste os ingredientes..." 
                        required
                    />
                  </div>

                  <div className="form-group">
                    <label>Modo de Preparo</label>
                    <textarea 
                        rows={3} 
                        value={novoPreparo} 
                        onChange={(e) => setNovoPreparo(e.target.value)} 
                        placeholder="Passo a passo..." 
                        required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fotoReceita" className="btn-add-foto">📸 Adicionar Foto do Prato</label>
                    <input type="file" id="fotoReceita" accept="image/*" onChange={handleImageChange} hidden />
                    {preview && (
                      <div className="image-preview-container">
                        <img src={preview} alt="Preview" className="img-preview-feed" />
                        <button type="button" onClick={() => setPreview(null)} className="btn-remove">Remover foto</button>
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
    </div>
  );
};

export default Home;