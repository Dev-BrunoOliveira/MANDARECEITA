import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './SetupProfile.css';

const SetupProfile = () => {
  const navigate = useNavigate();
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

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
    // No futuro, aqui salvamos no Banco de Dados
    navigate('/principal'); // Depois de configurar, vai pro feed
  };

  return (
    <div className="setup-container">
      <div className="setup-card">
        <h2>Bem-vindo(a) ao Manda Receita! 🍳</h2>
        <p>Vamos deixar o seu perfil com a sua cara.</p>

        <form onSubmit={handleFinalizar}>
          {/* Foto de Perfil Estilo Rede Social */}
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
            <input type="text" placeholder="Ex: Brunão, Nutri Ana..." required />
          </div>

          <div className="input-group">
            <label>Data de Nascimento</label>
            <input type="date" required />
          </div>

          <button type="submit" className="btn-finalizar">Começar a cozinhar!</button>
        </form>
      </div>
    </div>
  );
};

export default SetupProfile;