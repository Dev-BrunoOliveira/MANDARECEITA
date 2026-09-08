export interface User {
  name: string;
  email: string;
  bio?: string;
  location?: string;
  profilePhoto?: string;
  isLoggedIn?: boolean;
}

export interface RecipeComment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface Receita {
  id: number;
  nomeChef: string;
  avatarUrl: string;
  titulo: string;
  categoria: string;
  ingredientes: string;
  modoPreparo: string;
  tempoPreparo: string;
  imagemUrl: string;
  likes: number;
  likedByMe: boolean;
  bookmarkedByMe: boolean;
  comentarios: RecipeComment[];
  timestamp: string;
}

export interface NotificationItem {
  id: number;
  avatar: string;
  author: string;
  text: string;
  timeAgo: string;
  unread: boolean;
}
