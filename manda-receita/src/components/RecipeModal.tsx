import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import type { Receita } from "../types/recipe";

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeCreated: (nova: Receita) => void;
}

const DEFAULT_FOOD_IMAGES = [
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, onRecipeCreated }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("salgados");
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");
  const [previewImagem, setPreviewImagem] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImagem(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !ingredientes.trim() || !modoPreparo.trim()) {
      showToast("Por favor, preencha todos os campos obrigatórios.", "error");
      return;
    }

    const randomImg = DEFAULT_FOOD_IMAGES[Math.floor(Math.random() * DEFAULT_FOOD_IMAGES.length)];

    const novaReceita: Receita = {
      id: Date.now(),
      nomeChef: user?.name || "Chef Anônimo",
      avatarUrl: user?.profilePhoto || `https://i.pravatar.cc/40?u=${Date.now()}`,
      titulo: titulo.trim(),
      categoria,
      ingredientes: ingredientes.trim(),
      modoPreparo: modoPreparo.trim(),
      tempoPreparo: tempoPreparo.trim() || "30 min",
      imagemUrl: previewImagem || randomImg,
      likes: 0,
      likedByMe: false,
      bookmarkedByMe: false,
      comentarios: [],
      timestamp: new Date().toISOString(),
    };

    onRecipeCreated(novaReceita);
    showToast("Receita publicada com sucesso!", "success");

    // Reset form
    setTitulo("");
    setCategoria("salgados");
    setTempoPreparo("");
    setIngredientes("");
    setModoPreparo("");
    setPreviewImagem(null);
    onClose();
  };

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>Criar Receita</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-xmark"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-user-info">
            <img
              src={user?.profilePhoto || "https://i.pravatar.cc/40?u=me"}
              alt="Sua foto"
              className="modal-avatar"
            />
            <span className="modal-username">{user?.name || "Usuário"}</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="tituloReceita">
                <i className="fas fa-heading"></i> Título da Receita *
              </label>
              <input
                type="text"
                id="tituloReceita"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Bolo de Chocolate Perfeito"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="categoriaReceita">
                  <i className="fas fa-tag"></i> Categoria
                </label>
                <select
                  id="categoriaReceita"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="salgados">Salgados</option>
                  <option value="doces">Doces</option>
                  <option value="entradas">Entradas & Petiscos</option>
                  <option value="sobremesas">Sobremesas</option>
                  <option value="prato-principal">Prato Principal</option>
                  <option value="acompanhamentos">Acompanhamentos</option>
                  <option value="caldos">Caldos & Sopas</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="tempoPreparo">
                  <i className="fas fa-clock"></i> Tempo de Preparo
                </label>
                <input
                  type="text"
                  id="tempoPreparo"
                  value={tempoPreparo}
                  onChange={(e) => setTempoPreparo(e.target.value)}
                  placeholder="Ex: 45 min"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="ingredientes">
                <i className="fas fa-list-check"></i> Ingredientes *
              </label>
              <textarea
                id="ingredientes"
                rows={5}
                value={ingredientes}
                onChange={(e) => setIngredientes(e.target.value)}
                placeholder="- 1 xícara de farinha&#10;- 2 ovos&#10;- 1/2 xícara de açúcar"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="modoPreparo">
                <i className="fas fa-fire-burner"></i> Modo de Preparo *
              </label>
              <textarea
                id="modoPreparo"
                rows={6}
                value={modoPreparo}
                onChange={(e) => setModoPreparo(e.target.value)}
                placeholder="1. Misture os ingredientes secos.&#10;2. Adicione os ovos e o leite.&#10;3. Asse por 40 minutos."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fotoVideoReceita">
                <i className="fas fa-camera"></i> Foto da Receita
              </label>
              <div className="file-upload-area">
                <input
                  type="file"
                  id="fotoVideoReceita"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {!previewImagem ? (
                  <div className="file-upload-placeholder">
                    <i className="fas fa-cloud-arrow-up"></i>
                    <p>
                      Arraste uma foto ou <strong>clique para selecionar</strong>
                    </p>
                  </div>
                ) : (
                  <div className="preview-container">
                    <img src={previewImagem} alt="Preview" className="file-preview-img" />
                    <button
                      type="button"
                      className="btn-remove-preview"
                      onClick={() => setPreviewImagem(null)}
                    >
                      Remover foto
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn-publicar">
              <i className="fas fa-paper-plane"></i> Publicar Receita
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
