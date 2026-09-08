import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import type { NotificationItem } from "../types/recipe";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onOpenEditProfile?: () => void;
  onOpenSettings?: () => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/36?u=chef1",
    author: "Ana Cozinha",
    text: "curtiu sua receita Pudim de Leite Perfeito",
    timeAgo: "2 min atrás",
    unread: true,
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/36?u=chef2",
    author: "Chef Carlos",
    text: 'comentou: "Receita incrível! Vou fazer hoje mesmo"',
    timeAgo: "15 min atrás",
    unread: true,
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/36?u=chef3",
    author: "Maria Doces",
    text: "começou a seguir você",
    timeAgo: "1h atrás",
    unread: true,
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/36?u=jacquin",
    author: "Chef Jacquin",
    text: "curtiu sua receita Bolo de Chocolate",
    timeAgo: "3h atrás",
    unread: false,
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/36?u=chef1",
    author: "Ana Cozinha",
    text: "compartilhou sua receita",
    timeAgo: "5h atrás",
    unread: false,
  },
];

const Header: React.FC<HeaderProps> = ({
  searchQuery = "",
  onSearchChange,
  onOpenEditProfile,
  onOpenSettings,
}) => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("Todas as notificações marcadas como lidas", "info");
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    showToast("Até mais!", "info");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <header id="mainHeader">
      <div className="header-left">
        <Link to="/principal" className="header-logo">
          <span className="header-logo-text">Manda Receita</span>
        </Link>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            id="searchInput"
            placeholder="Buscar receitas, pessoas..."
            value={searchQuery}
            onChange={(e) => {
              if (onSearchChange) {
                onSearchChange(e.target.value);
              }
            }}
          />
        </div>
      </div>

      <div className="header-right">
        {/* Dropdown Notificações */}
        <div className="notifications-wrapper">
          <button
            className="header-btn"
            title="Notificações"
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsUserMenuOpen(false);
            }}
          >
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>

          {isNotifOpen && (
            <div className="notifications-dropdown open" onClick={(e) => e.stopPropagation()}>
              <div className="notif-header">
                <h4>Notificações</h4>
                <button className="notif-mark-read" onClick={handleMarkAllRead}>
                  Marcar todas como lidas
                </button>
              </div>
              <div className="notif-list">
                {notifications.map((n) => (
                  <div key={n.id} className={`notif-item ${n.unread ? "unread" : ""}`}>
                    <img src={n.avatar} alt={n.author} />
                    <div className="notif-content">
                      <p>
                        <strong>{n.author}</strong> {n.text}
                      </p>
                      <span className="notif-time">
                        <i className="fas fa-clock"></i> {n.timeAgo}
                      </span>
                    </div>
                    {n.unread && <span className="notif-dot"></span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dropdown Menu Usuário */}
        <div
          className={`header-user-menu ${isUserMenuOpen ? "open" : ""}`}
          onClick={() => {
            setIsUserMenuOpen(!isUserMenuOpen);
            setIsNotifOpen(false);
          }}
        >
          <img
            src={user?.profilePhoto || "https://i.pravatar.cc/36?u=me"}
            alt="Meu perfil"
            className="header-avatar"
          />
          <span className="header-username">{user?.name || "Usuário"}</span>
          <i className="fas fa-chevron-down"></i>

          {isUserMenuOpen && (
            <div className="user-dropdown open" onClick={(e) => e.stopPropagation()}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUserMenuOpen(false);
                  if (onOpenEditProfile) {
                    onOpenEditProfile();
                  }
                }}
              >
                <i className="fas fa-user-pen"></i> Editar Perfil
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUserMenuOpen(false);
                  if (onOpenSettings) {
                    onOpenSettings();
                  }
                }}
              >
                <i className="fas fa-gear"></i> Configurações
              </a>
              <hr />
              <a href="#" onClick={handleLogout}>
                <i className="fas fa-right-from-bracket"></i> Sair
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
