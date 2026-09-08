import type { Receita } from "../types/recipe";

const STORAGE_KEY = "@MandaReceita:receitas";

export const RECEITAS_INICIAIS: Receita[] = [
  {
    id: 1,
    chef: "Chef Erick Jacquin",
    chefAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120",
    titulo: "Pudim de Leite Condensado Tradicional",
    categoria: "Doces",
    imagem: "https://images.pexels.com/photos/2105104/pexels-photo-2105104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ingredientes: "1 lata de leite condensado\n1 lata de leite (mesmo tamanho da lata de leite condensado)\n3 ovos inteiros\n1 xícara de açúcar para o caramelo\n1/2 xícara de água para o caramelo",
    preparo: "1. Em uma panela, derreta o açúcar até ficar dourado e adicione a água cuidadosamente. Deixe ferver até dissolver os grumos.\n2. Caramelize uma forma de pudim com furo central e reserve.\n3. No liquidificador, bata o leite condensado, o leite e os ovos por 3 minutos até ficar homogêneo.\n4. Despeje a mistura na forma caramelizada.\n5. Cubra com papel alumínio e asse em banho-maria em forno preaquecido a 180°C por cerca de 1 hora e 30 minutos.\n6. Deixe esfriar completamente e leve à geladeira por 4 horas antes de desenformar.",
    tempoPreparo: "90 min",
    porcoes: "8 porções",
    curtidas: 24,
    curtidoPeloUsuario: false,
    dataCriacao: "Hoje",
  },
  {
    id: 2,
    chef: "Dona Maria",
    chefAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120",
    titulo: "Bolo de Cenoura com Cobertura de Chocolate",
    categoria: "Doces",
    imagem: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ingredientes: "3 cenouras médias picadas\n3 ovos\n1 xícara de óleo de milho ou girassol\n2 xícaras de açúcar\n2 xícaras de farinha de trigo\n1 colher (sopa) de fermento em pó\n1 xícara de chocolate em pó (cobertura)\n1 colher (sopa) de manteiga (cobertura)\n1/2 xícara de leite (cobertura)\n1 xícara de açúcar (cobertura)",
    preparo: "1. No liquidificador, bata as cenouras, os ovos e o óleo até obter um creme bem liso.\n2. Em uma tigela, misture o açúcar e a farinha de trigo peneirados.\n3. Adicione a mistura do liquidificador à tigela e mexa bem com um fouet até incorporar.\n4. Acrescente o fermento e misture delicadamente.\n5. Despeje em forma untada e enfarinhada e asse a 180°C por aproximadamente 40 minutos.\n6. Para a cobertura: leve o chocolate em pó, a manteiga, o leite e o açúcar ao fogo médio até ferver e engrossar levemente. Despeje sobre o bolo ainda quente.",
    tempoPreparo: "50 min",
    porcoes: "12 porções",
    curtidas: 42,
    curtidoPeloUsuario: true,
    dataCriacao: "Ontem",
  },
  {
    id: 3,
    chef: "Mestre do Churrasco",
    chefAvatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=120",
    titulo: "Picanha Suculenta na Grelha",
    categoria: "Salgados",
    imagem: "https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ingredientes: "1 peça de picanha bovina de alta qualidade (aprox. 1.2kg)\nSal grosso a gosto\nPimenta-do-reino moída na hora",
    preparo: "1. Retire a picanha da geladeira 30 minutos antes de assar para que fique em temperatura ambiente.\n2. Faça cortes leves em diagonal na camada de gordura, sem atingir a carne.\n3. Tempere a peça uniformemente com sal grosso.\n4. Leve à grelha com o braseiro bem quente, primeiro com a gordura virada para cima por 10 a 15 minutos.\n5. Vire a gordura para baixo até selar e dourar, tomando cuidado com labaredas.\n6. Retire, deixe a carne descansar por 5 minutos antes de fatiar contra a fibra e servir.",
    tempoPreparo: "35 min",
    porcoes: "6 porções",
    curtidas: 58,
    curtidoPeloUsuario: false,
    dataCriacao: "Há 3 dias",
  }
];

export const getReceitasSalvas = (): Receita[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(RECEITAS_INICIAIS));
      return RECEITAS_INICIAIS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : RECEITAS_INICIAIS;
  } catch (err) {
    console.error("Erro ao ler receitas do localStorage:", err);
    return RECEITAS_INICIAIS;
  }
};

export const salvarReceitaStorage = (novaReceita: Receita): Receita[] => {
  const atuais = getReceitasSalvas();
  const atualizadas = [novaReceita, ...atuais];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
  return atualizadas;
};

export const toggleCurtidaStorage = (id: number): Receita[] => {
  const atuais = getReceitasSalvas();
  const atualizadas = atuais.map((rec) => {
    if (rec.id === id) {
      const estaCurtido = rec.curtidoPeloUsuario ?? false;
      const curtidasAtuais = rec.curtidas ?? 0;
      return {
        ...rec,
        curtidoPeloUsuario: !estaCurtido,
        curtidas: estaCurtido ? Math.max(0, curtidasAtuais - 1) : curtidasAtuais + 1,
      };
    }
    return rec;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
  return atualizadas;
};

export const deletarReceitaStorage = (id: number): Receita[] => {
  const atuais = getReceitasSalvas();
  const atualizadas = atuais.filter((rec) => rec.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
  return atualizadas;
};
