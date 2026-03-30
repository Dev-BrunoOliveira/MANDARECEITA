import { useState, type ChangeEvent, type FormEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import "./SetupProfile.css"
import { useAuth } from "../context/AuthContext"

const SetupProfile = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  // --- NOVOS ESTADOS AQUI ---
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(user?.avatar || null)
  const [nomeExibicao, setNomeExibicao] = useState(user?.name || "")
  const [dataNascimento, setDataNascimento] = useState("") // Novo
  const [bio, setBio] = useState("") // Novo
  const [localizacao, setLocalizacao] = useState("") // Novo

  useEffect(() => {
    if (user?.isProfileCompleted) {
      navigate("/principal")
    }
  }, [user, navigate])

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("A foto é muito grande! Max 2MB.")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => setFotoPerfil(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleFinalizar = (e: FormEvent) => {
    e.preventDefault()
    if (!user) return

    const usernameGerado = nomeExibicao.toLowerCase().replace(/\s+/g, "_")

    // --- ADICIONANDO AS INFOS NO OBJETO ---
    const usuarioAtualizado = {
      ...user,
      name: nomeExibicao,
      username: usernameGerado,
      avatar: fotoPerfil || user.avatar,
      dataNascimento, // Salvando nova info
      bio,            // Salvando nova info
      localizacao,    // Salvando nova info
      isProfileCompleted: true
    }

    setUser(usuarioAtualizado)
    localStorage.setItem("@MandaReceita:user", JSON.stringify(usuarioAtualizado))
    navigate("/principal")
  }

  return (
    <div className="perfil-page-wrapper">
      <Header />
      <main className="perfil-container-bg">
        <div className="setup-card">
          <h2>Bem-vindo(a) ao Manda Receita 🍳</h2>
          <p>Vamos deixar o seu perfil com a sua cara.</p>

          <form onSubmit={handleFinalizar}>
            {/* Upload de Foto */}
            <div className="avatar-upload">
              <div className="avatar-preview">
                <img src={fotoPerfil || "https://via.placeholder.com/150"} alt="Preview" style={{ objectFit: 'cover' }} />
              </div>
              <label htmlFor="fotoInput" className="btn-upload">Alterar Foto</label>
              <input type="file" id="fotoInput" accept="image/*" onChange={handleFotoChange} hidden />
            </div>

            {/* Nome */}
            <div className="input-group">
              <label>Como quer ser chamado?</label>
              <input
                type="text"
                placeholder="Ex: Chef Bruno"
                value={nomeExibicao}
                onChange={(e) => setNomeExibicao(e.target.value)}
                required
              />
            </div>

            {/* Data de Nascimento */}
            <div className="input-group">
              <label>Data de Nascimento</label>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                required
              />
            </div>

            {/* Localização */}
            <div className="input-group">
              <label>Onde você mora? (Cidade/Estado)</label>
              <input
                type="text"
                placeholder="Ex: São Paulo, SP"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-finalizar">Começar a cozinhar </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default SetupProfile