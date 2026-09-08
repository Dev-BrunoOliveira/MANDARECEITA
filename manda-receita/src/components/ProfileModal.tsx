import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.location || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.profilePhoto || "https://i.pravatar.cc/80?u=me");

  const [prevUser, setPrevUser] = useState(user);
  if (user !== prevUser) {
    setPrevUser(user);
    setName(user?.name || "");
    setBio(user?.bio || "");
    setLocation(user?.location || "");
    setAvatarPreview(user?.profilePhoto || "https://i.pravatar.cc/80?u=me");
  }

  if (!isOpen) return null;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateUser({
      name: name.trim() || user?.name || "Usuário",
      bio: bio.trim(),
      location: location.trim(),
      profilePhoto: avatarPreview,
    });

    showToast("Perfil atualizado com sucesso!", "success");
    onClose();
  };

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-profile">
        <div className="modal-header">
          <h2>Editar Perfil</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-xmark"></i>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <i className="fas fa-camera"></i> Foto de Perfil
              </label>
              <div className="profile-photo-edit">
                <img
                  src={avatarPreview}
                  alt="Foto de perfil"
                  className="edit-profile-avatar"
                />
                <input
                  type="file"
                  id="editProfilePhoto"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  hidden
                />
                <label htmlFor="editProfilePhoto" className="btn-change-photo">
                  <i className="fas fa-pen"></i>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="editName">
                <i className="fas fa-user"></i> Nome
              </label>
              <input
                type="text"
                id="editName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="editBio">
                <i className="fas fa-pen-fancy"></i> Biografia
              </label>
              <textarea
                id="editBio"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte um pouco sobre você e sua paixão pela culinária..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="editLocation">
                <i className="fas fa-location-dot"></i> Localização
              </label>
              <input
                type="text"
                id="editLocation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: São Paulo, SP"
              />
            </div>

            <button type="submit" className="btn-publicar">
              <i className="fas fa-check"></i> Salvar Perfil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
