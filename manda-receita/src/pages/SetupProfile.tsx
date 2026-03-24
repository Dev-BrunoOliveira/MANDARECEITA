import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import './SetupProfile.css';

const SetupProfile = () => {
  const navigate = useNavigate();
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [nomeExibicao, setNomeExibicao] = useState('');

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

    const dadosUsuario = {
      nome: nomeExibicao,
      foto: fotoPerfil
    };

    localStorage.setItem('@MandaReceita:perfil', JSON.stringify(dadosUsuario));

    alert("Perfil configurado com sucesso!");
    navigate('/principal'); 
  };

  return (
    // A classe principal que terá a imagem de fundo no CSS
    <div className="perfil-page-wrapper">
      <Header /> 

      <main className="perfil-container-bg">
        <div className="setup-card">
          <h2>Bem-vindo(a) ao Manda Receita! 🍳</h2>
          <p>Vamos deixar o seu perfil com a sua cara.</p>

          <form onSubmit={handleFinalizar}>
            <div className="avatar-upload">
              <div className="avatar-preview">
                <img 
                  src={fotoPerfil || "https://via.placeholder.com/150"} 
                  alt="Preview" 
                />
              </div>
              <label htmlFor="fotoInput" className="btn-upload">Alterar Foto</label>
              <input 
                type="file" 
                id="fotoInput" 
                accept="image/*" 
                onChange={handleFotoChange} 
                hidden 
              />
            </div>

            <div className="input-group">
              <label>Nome Completo</label>
              <input type="text" placeholder="Como no documento" required />
            </div>

            <div className="input-group">
              <label>Como quer ser chamado(a)?</label>
              <input 
                type="text" 
                placeholder="Ex: Brunão" 
                value={nomeExibicao}
                onChange={(e) => setNomeExibicao(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label>Data de Nascimento</label>
              <input type="date" required />
            </div>

            <button type="submit" className="btn-finalizar">Começar a cozinhar!</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SetupProfile;