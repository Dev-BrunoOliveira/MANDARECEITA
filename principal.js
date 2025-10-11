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
      if (file) {
        alert("Preview disponível apenas para imagens.");
      }
    }
  });

  formNovaReceita.addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeChef = document.getElementById("nomeChef").value;
    const titulo = document.getElementById("tituloReceita").value;
    const categoria = document.getElementById("categoriaReceita").value;
    const ingredientes = document.getElementById("ingredientes").value;
    const modoPreparo = document.getElementById("modoPreparo").value;
    const imagemFile = fotoVideoReceitaInput.files[0];

    let imagemParaSalvar =
      "https://via.placeholder.com/600x400.png?text=Receita+sem+foto";

    if (imagemFile && previewImagem.src.startsWith("data:image")) {
      imagemParaSalvar = previewImagem.src;
    }

    const novaReceita = {
      id: Date.now(),
      nomeChef: nomeChef,
      titulo: titulo,
      categoria: categoria,
      ingredientes: ingredientes,
      modoPreparo: modoPreparo,
      imagemUrl: imagemParaSalvar,
    };

    console.log("Objeto novaReceita pronto:", novaReceita);
    adicionarReceitaAoFeed(novaReceita);
    salvarReceita(novaReceita);

    formNovaReceita.reset();
    previewImagem.style.display = "none";
    previewImagem.src = "#";
  });

  function adicionarReceitaAoFeed(receita) {
    console.log("Adicionando ao feed:", receita.titulo);

    const cardReceita = document.createElement("div");
    cardReceita.classList.add("card-receita");
    cardReceita.dataset.id = receita.id;

    cardReceita.innerHTML = `
      <div class="card-user-info">
        <img src="https://i.pravatar.cc/40?u=${receita.id}" alt="Avatar">
        <span class="username">${receita.nomeChef || "Chef Anônimo"}</span>
      </div>
      <img src="${receita.imagemUrl}" alt="${receita.titulo}">
      <div class="card-content">
        <h3>${receita.titulo}</h3>
        <p class="categoria">${formatarCategoria(receita.categoria)}</p>
        
        <div class="recipe-details">
          <div class="recipe-section recipe-ingredients">
            <h4>Ingredientes</h4>
            <p>${receita.ingredientes}</p>
          </div>
          <div class="recipe-section recipe-preparation">
            <h4>Modo de Preparo</h4>
            <p>${receita.modoPreparo || "Não informado."}</p> 
          </div>
        </div>
        <a class="toggle-recipe-link">Veja a receita completa</a>

      </div>
      <div class="card-actions">
        <button>👍 Curtir</button>
        <button>💬 Comentar</button>
      </div>
    `;

    const toggleLink = cardReceita.querySelector(".toggle-recipe-link");
    const recipeDetails = cardReceita.querySelector(".recipe-details");

    toggleLink.addEventListener("click", (e) => {
      e.preventDefault();
      recipeDetails.classList.toggle("expanded");
      if (recipeDetails.classList.contains("expanded")) {
        toggleLink.textContent = "Ocultar receita";
      } else {
        toggleLink.textContent = "Veja a receita completa";
      }
    });

    containerReceitas.prepend(cardReceita);
  }

  function formatarCategoria(categoriaValue) {
    if (!categoriaValue) return "";
    let texto = categoriaValue.replace(/-/g, " ");
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  function salvarReceita(receita) {
    let receitasStorage = JSON.parse(localStorage.getItem("receitas")) || [];
    receitasStorage.unshift(receita);
    localStorage.setItem("receitas", JSON.stringify(receitasStorage));
    console.log("Receita salva no localStorage.");
  }

  function carregarReceitas() {
    const receitasSalvas = JSON.parse(localStorage.getItem("receitas")) || [];
    console.log("Receitas carregadas:", receitasSalvas);
    containerReceitas.innerHTML = "";
    receitasSalvas.forEach((receita) => {
      if (receita && receita.titulo) {
        adicionarReceitaAoFeed(receita);
      }
    });
    console.log("Carregamento de receitas concluído.");
  }
});
