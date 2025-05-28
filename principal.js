document.addEventListener("DOMContentLoaded", () => {
  const formNovaReceita = document.getElementById("formNovaReceita");
  const containerReceitas = document.getElementById("containerReceitas");
  const fotoVideoReceitaInput = document.getElementById("fotoVideoReceita");
  const previewImagem = document.getElementById("previewImagem");

  console.log("Iniciando script principal.js e carregando receitas..."); 
  carregarReceitas();

  fotoVideoReceitaInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImagem.src = e.target.result;
        previewImagem.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewImagem.src = "#";
      previewImagem.style.display = "none";
      if (file && !file.type.startsWith("image/")) {
        alert("Preview disponível apenas para imagens.");
      }
    }
  });

  formNovaReceita.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Formulário de nova receita submetido."); 

    const titulo = document.getElementById("tituloReceita").value;
    const categoria = document.getElementById("categoriaReceita").value;
    const ingredientes = document.getElementById("ingredientesReceita").value;
    const imagemFile = fotoVideoReceitaInput.files[0];

    let imagemParaSalvar =
      "https://via.placeholder.com/300x200.png?text=Receita";

    if (imagemFile && previewImagem.src.startsWith("data:image")) {
      imagemParaSalvar = previewImagem.src;
    } else if (
      !imagemFile &&
      previewImagem.style.display !== "none" &&
      previewImagem.src.startsWith("data:image")
    ) {
      imagemParaSalvar = previewImagem.src;
    }

    const novaReceita = {
      id: Date.now(),
      titulo: titulo,
      categoria: categoria,
      ingredientes: ingredientes,
      imagemUrl: imagemParaSalvar,
    };

    console.log("Objeto novaReceita pronto para adicionar e salvar:", novaReceita);
    adicionarReceitaAoFeed(novaReceita);
    salvarReceita(novaReceita);

    formNovaReceita.reset();
    previewImagem.style.display = "none";
    previewImagem.src = "#";
    console.log("Formulário resetado após submissão."); 
  });

  function adicionarReceitaAoFeed(receita) {
    console.log("Adicionando receita ao feed (DOM):", receita.titulo); 
    const cardReceita = document.createElement("div");
    cardReceita.classList.add("card-receita");
    cardReceita.dataset.id = receita.id;

    const img = document.createElement("img");
    img.src = receita.imagemUrl;
    img.alt = receita.titulo;

    const h3 = document.createElement("h3");
    h3.textContent = receita.titulo;

    const pCategoria = document.createElement("p");
    pCategoria.classList.add("categoria");
    pCategoria.textContent = `Categoria: ${formatarCategoria(
      receita.categoria
    )}`;

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("recipe-details");

    const detailsTitle = document.createElement("h4");
    detailsTitle.textContent = "Ingredientes e Modo de Preparo:";
    const detailsText = document.createElement("p");
    detailsText.textContent = receita.ingredientes;

    detailsDiv.appendChild(detailsTitle);
    detailsDiv.appendChild(detailsText);

    const toggleLink = document.createElement("a");
    toggleLink.href = "#";
    toggleLink.classList.add("toggle-details-link");
    toggleLink.textContent = "Veja a receita completa";

    toggleLink.addEventListener("click", (e) => {
      e.preventDefault();
      detailsDiv.classList.toggle("visible");

      if (detailsDiv.classList.contains("visible")) {
        toggleLink.textContent = "Fechar receita";
      } else {
        toggleLink.textContent = "Veja a receita completa";
      }
    });

    cardReceita.appendChild(img);
    cardReceita.appendChild(h3);
    cardReceita.appendChild(pCategoria);
    cardReceita.appendChild(detailsDiv);
    cardReceita.appendChild(toggleLink);

    containerReceitas.prepend(cardReceita);
  }

  function formatarCategoria(categoriaValue) {
    if (!categoriaValue) return "";
    return categoriaValue.charAt(0).toUpperCase() + categoriaValue.slice(1);
  }

  function salvarReceita(receita) {
    console.log("Função salvarReceita chamada com:", receita);
    let receitasStorage;
    try {
        
        const item = localStorage.getItem("receitas");
        receitasStorage = item ? JSON.parse(item) : [];
        
        if (!Array.isArray(receitasStorage)) {
            console.warn("Conteúdo de 'receitas' no localStorage não era um array. Resetando.");
            receitasStorage = [];
        }
    } catch (error) {
        console.error("Erro ao parsear 'receitas' do localStorage:", error);
        console.warn("Resetando 'receitas' para um array vazio devido ao erro de parse.");
        receitasStorage = [];
    }

    console.log("Antes de salvar - Receitas atuais do storage:", JSON.parse(JSON.stringify(receitasStorage)));
    receitasStorage.unshift(receita); // Adiciona a nova receita no início do array
    try {
        localStorage.setItem("receitas", JSON.stringify(receitasStorage));
        console.log("Depois de salvar - localStorage('receitas'):", localStorage.getItem("receitas"));
    } catch (e) {
        console.error("Erro ao salvar no localStorage (possivelmente cota excedida):", e);
        alert("Erro ao salvar a receita! O armazenamento local pode estar cheio ou indisponível.");
    }
  }

  function carregarReceitas() {
    console.log("Função carregarReceitas chamada.");
    const receitasSalvas = localStorage.getItem("receitas");
    console.log("Conteúdo bruto do localStorage('receitas') ao carregar:", receitasSalvas);

    let receitas = [];
    if (receitasSalvas) {
        try {
            receitas = JSON.parse(receitasSalvas);
            
            if (!Array.isArray(receitas)) {
                console.warn("Conteúdo de 'receitas' no localStorage não era um array após parse. Carregando como vazio.");
                receitas = [];
            }
        } catch (error) {
            console.error("Erro ao parsear 'receitas' do localStorage ao carregar:", error);
            console.warn("Carregando lista de receitas como vazia devido ao erro de parse.");
            receitas = []; 
        }
    }
    
    console.log("Receitas carregadas e parseadas:", receitas);

    
    
    if (containerReceitas) { 
        containerReceitas.innerHTML = '';
    } else {
        console.error("Elemento 'containerReceitas' não encontrado no DOM ao tentar limpar.");
        return; 
    }


    if (Array.isArray(receitas)) { 
        receitas.forEach((receita) => {
            
            if (receita && typeof receita.titulo !== 'undefined') {
                adicionarReceitaAoFeed(receita);
            } else {
                console.warn("Item inválido encontrado nas receitas carregadas:", receita);
            }
        });
    } else {
        console.error("'receitas' não é um array após carregar e parsear. Não é possível iterar.");
    }
    console.log("Carregamento de receitas concluído.");
  }
});