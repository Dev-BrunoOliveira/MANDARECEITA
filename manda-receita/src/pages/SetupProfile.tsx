import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./SetupProfile.css";
import { useAuth } from "../context/AuthContext";

const SetupProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [fotoPerfil, setFotoPerfil] = useState<string | null>(
    user?.avatar || null,
  );
  const [nomeExibicao, setNomeExibicao] = useState(user?.name || "");
  const [dataNascimento, setDataNascimento] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [status, setStatus] = useState("");
  const [especialidade, setEspecialidade] = useState("Amador");

  useEffect(() => {
    if (user?.isProfileCompleted) {
      navigate("/principal");
    }
  }, [user, navigate]);

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPerfil(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFinalizar = (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const usuarioAtualizado = {
      ...user,
      name: nomeExibicao,
      username: nomeExibicao.toLowerCase().replace(/\s+/g, "_"),
      avatar: fotoPerfil || user.avatar,
      dataNascimento,
      localizacao,
      status,
      especialidade,
      isProfileCompleted: true,
    };

    setUser(usuarioAtualizado);
    localStorage.setItem(
      "@MandaReceita:user",
      JSON.stringify(usuarioAtualizado),
    );
    navigate("/principal");
  };

  return (
    <div className="perfil-page-wrapper">
      <Header />
      <main className="perfil-container-bg">
        <div className="setup-card">
          <div className="setup-header">
            <h2>Quase lá, Chef! 👨‍🍳</h2>
            <p>Personalize sua conta para interagir com a comunidade.</p>
          </div>

          <form onSubmit={handleFinalizar}>
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <img
                  src={fotoPerfil || "https://via.placeholder.com/150"}
                  alt="Preview"
                />
                <label htmlFor="fotoInput" className="change-photo-badge">
                  <i className="fas fa-camera"></i>
                </label>
              </div>
              <input
                type="file"
                id="fotoInput"
                accept="image/*"
                onChange={handleFotoChange}
                hidden
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Nome no perfil</label>
                <input
                  type="text"
                  value={nomeExibicao}
                  onChange={(e) => setNomeExibicao(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Nível na cozinha</label>
                <select
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                >
                  <option value="Amador">Cozinho por hobby </option>
                  <option value="Intermediário">Me arrisco em tudo </option>
                  <option value="Profissional">Chef de Respeito </option>
                  <option value="Confeiteiro">Mestre dos Doces </option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Slogan ou Status (Bio curta)</label>
              <input
                type="text"
                placeholder="Ex: Apaixonado por massas e vinhos 🍷"
                maxLength={60}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <small>{status.length}/60 caracteres</small>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Aniversário</label>
                <input
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Onde você cozinha? (Cidade)</label>
                <input
                  type="text"
                  placeholder="Ex: São Paulo, SP"
                  value={localizacao}
                  onChange={(e) => setLocalizacao(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-confirmar">
              Entrar na Comunidade
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SetupProfile;
