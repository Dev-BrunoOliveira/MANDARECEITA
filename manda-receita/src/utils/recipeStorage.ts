import type { Receita, RecipeComment } from "../types/recipe";

export const DEFAULT_RECIPES: Receita[] = [
  {
    id: 1001,
    nomeChef: "Chef Jacquin",
    avatarUrl: "https://i.pravatar.cc/42?u=jacquin",
    titulo: "Pudim de Leite Perfeito",
    categoria: "doces",
    ingredientes:
      "- 1 lata de leite condensado\n- 1 lata de leite (use a lata como medida)\n- 3 ovos inteiros\n- 1 xícara de açúcar para a calda",
    modoPreparo:
      "1. Faça a calda: coloque o açúcar em uma forma e leve ao fogo até caramelizar.\n2. Bata no liquidificador o leite condensado, o leite e os ovos.\n3. Despeje a mistura na forma caramelizada.\n4. Asse em banho-maria no forno a 180°C por 1 hora.\n5. Desenforme gelado.",
    tempoPreparo: "1h 30min",
    imagemUrl:
      "https://images.pexels.com/photos/2105104/pexels-photo-2105104.jpeg?auto=compress&cs=tinysrgb&w=800",
    likes: 195,
    likedByMe: false,
    bookmarkedByMe: false,
    comentarios: [
      {
        id: 1,
        author: "Ana Cozinha",
        avatar: "https://i.pravatar.cc/32?u=chef1",
        text: "Receita maravilhosa! Fiz ontem e ficou perfeito!",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 2,
        author: "Carlos Gourmet",
        avatar: "https://i.pravatar.cc/32?u=chef2",
        text: "Dica: adicione uma pitada de canela na calda. Fica divino!",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 1002,
    nomeChef: "Ana Cozinha",
    avatarUrl: "https://i.pravatar.cc/42?u=chef1",
    titulo: "Bolo de Chocolate Fofinho",
    categoria: "doces",
    ingredientes:
      "- 3 ovos\n- 2 xícaras de farinha de trigo\n- 1 xícara de chocolate em pó\n- 2 xícaras de açúcar\n- 1 xícara de leite\n- 1/2 xícara de óleo\n- 1 colher de fermento",
    modoPreparo:
      "1. Bata os ovos com o açúcar até ficar cremoso.\n2. Adicione o óleo e o leite, misture bem.\n3. Acrescente a farinha e o chocolate peneirados.\n4. Por último, adicione o fermento e misture delicadamente.\n5. Asse em forno preaquecido a 180°C por 40 minutos.",
    tempoPreparo: "50 min",
    imagemUrl:
      "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800",
    likes: 324,
    likedByMe: false,
    bookmarkedByMe: true,
    comentarios: [
      {
        id: 3,
        author: "Maria Doces",
        avatar: "https://i.pravatar.cc/32?u=chef3",
        text: "Esse bolo é o melhor que já fiz! A família amou",
        timestamp: new Date(Date.now() - 14400000).toISOString(),
      },
    ],
    timestamp: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: 1003,
    nomeChef: "Carlos Gourmet",
    avatarUrl: "https://i.pravatar.cc/42?u=chef2",
    titulo: "Strogonoff de Frango Cremoso",
    categoria: "prato-principal",
    ingredientes:
      "- 500g de peito de frango em cubos\n- 1 lata de creme de leite\n- 2 colheres de catchup\n- 1 colher de mostarda\n- 200g de champignon\n- 1 cebola picada\n- Sal e pimenta a gosto",
    modoPreparo:
      "1. Refogue a cebola em óleo até dourar.\n2. Adicione o frango e tempere com sal e pimenta.\n3. Quando o frango estiver cozido, adicione o catchup e a mostarda.\n4. Acrescente o champignon e misture.\n5. Desligue o fogo e adicione o creme de leite.\n6. Sirva com arroz e batata palha.",
    tempoPreparo: "35 min",
    imagemUrl:
      "https://images.pexels.com/photos/6419701/pexels-photo-6419701.jpeg?auto=compress&cs=tinysrgb&w=800",
    likes: 167,
    likedByMe: false,
    bookmarkedByMe: false,
    comentarios: [],
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
];

export function getReceitasSalvas(): Receita[] {
  try {
    const data = localStorage.getItem("receitas");
    if (!data) {
      localStorage.setItem("receitas", JSON.stringify(DEFAULT_RECIPES));
      return DEFAULT_RECIPES;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_RECIPES;
  } catch {
    return DEFAULT_RECIPES;
  }
}

export function salvarReceitaStorage(novaReceita: Receita): Receita[] {
  const receitas = getReceitasSalvas();
  const atualizadas = [novaReceita, ...receitas];
  localStorage.setItem("receitas", JSON.stringify(atualizadas));
  return atualizadas;
}

export function deletarReceitaStorage(id: number): Receita[] {
  const receitas = getReceitasSalvas();
  const atualizadas = receitas.filter((r) => r.id !== id);
  localStorage.setItem("receitas", JSON.stringify(atualizadas));
  return atualizadas;
}

export function toggleCurtidaStorage(id: number): Receita[] {
  const receitas = getReceitasSalvas();
  const idx = receitas.findIndex((r) => r.id === id);
  if (idx !== -1) {
    if (receitas[idx].likedByMe) {
      receitas[idx].likes = Math.max(0, (receitas[idx].likes || 1) - 1);
      receitas[idx].likedByMe = false;
    } else {
      receitas[idx].likes = (receitas[idx].likes || 0) + 1;
      receitas[idx].likedByMe = true;
    }
    localStorage.setItem("receitas", JSON.stringify(receitas));
  }
  return [...receitas];
}

export function toggleBookmarkStorage(id: number): Receita[] {
  const receitas = getReceitasSalvas();
  const idx = receitas.findIndex((r) => r.id === id);
  if (idx !== -1) {
    receitas[idx].bookmarkedByMe = !receitas[idx].bookmarkedByMe;
    localStorage.setItem("receitas", JSON.stringify(receitas));
  }
  return [...receitas];
}

export function adicionarComentarioStorage(id: number, comentario: RecipeComment): Receita[] {
  const receitas = getReceitasSalvas();
  const idx = receitas.findIndex((r) => r.id === id);
  if (idx !== -1) {
    if (!receitas[idx].comentarios) receitas[idx].comentarios = [];
    receitas[idx].comentarios.push(comentario);
    localStorage.setItem("receitas", JSON.stringify(receitas));
  }
  return [...receitas];
}

export function formatarCategoria(categoriaValue: string): string {
  if (!categoriaValue) return "";
  const map: Record<string, string> = {
    salgados: "Salgados",
    doces: "Doces",
    entradas: "Entradas & Petiscos",
    sobremesas: "Sobremesas",
    "prato-principal": "Prato Principal",
    acompanhamentos: "Acompanhamentos",
    caldos: "Caldos & Sopas",
  };
  return map[categoriaValue.toLowerCase()] || categoriaValue;
}

export function getTimeAgo(timestamp: string): string {
  if (!timestamp) return "agora";
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `${diffMin} min`;
  if (diffHour < 24) return `${diffHour}h`;
  if (diffDay < 7) return `${diffDay}d`;
  return then.toLocaleDateString("pt-BR");
}
