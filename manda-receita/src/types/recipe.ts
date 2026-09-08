export interface Receita {
  id: number;
  chef: string;
  chefAvatar?: string;
  titulo: string;
  categoria: string;
  imagem: string;
  ingredientes: string;
  preparo: string;
  tempoPreparo?: string;
  porcoes?: string;
  curtidas?: number;
  curtidoPeloUsuario?: boolean;
  dataCriacao?: string;
}
