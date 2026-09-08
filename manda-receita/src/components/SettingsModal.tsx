import React, { useState } from "react";
import { useToast } from "../hooks/useToast";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" || document.body.classList.contains("dark-mode");
  });

  const [emailNotif, setEmailNotif] = useState(true);

  if (!isOpen) return null;

  const handleDarkModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsDarkMode(checked);
    document.body.classList.toggle("dark-mode", checked);
    localStorage.setItem("theme", checked ? "dark" : "light");
    showToast(checked ? "Modo Escuro ativado" : "Modo Claro ativado", "info");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Configurações salvas com sucesso!", "success");
    onClose();
  };

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-profile">
        <div className="modal-header">
          <h2>Configurações</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-xmark"></i>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div
              className="form-group"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <label htmlFor="themeToggle" style={{ marginBottom: 0 }}>
                <i className="fas fa-moon"></i> Modo Escuro
              </label>
              <input
                type="checkbox"
                id="themeToggle"
                checked={isDarkMode}
                onChange={handleDarkModeChange}
                style={{ width: 20, height: 20, accentColor: "var(--primary)" }}
              />
            </div>

            <div
              className="form-group"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <label htmlFor="notifToggle" style={{ marginBottom: 0 }}>
                <i className="fas fa-bell"></i> Notificações por Email
              </label>
              <input
                type="checkbox"
                id="notifToggle"
                checked={emailNotif}
                onChange={(e) => setEmailNotif(e.target.checked)}
                style={{ width: 20, height: 20, accentColor: "var(--primary)" }}
              />
            </div>

            <hr style={{ border: 0, borderTop: "1px solid var(--border-light)", margin: "20px 0" }} />

            <button type="submit" className="btn-publicar">
              <i className="fas fa-check"></i> Salvar Configurações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
