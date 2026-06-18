// ===== MANDA RECEITA - PRINCIPAL JS =====

document.addEventListener("DOMContentLoaded", () => {
  // ===== TOAST SYSTEM =====
  function showToast(message, type = "info", duration = 3000) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const icons = {
      success: '<i class="fas fa-check-circle"></i>',
      error: '<i class="fas fa-exclamation-circle"></i>',
      info: '<i class="fas fa-info-circle"></i>',
    };
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `${icons[type] || icons.info} <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("hide");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ===== ELEMENTS =====
  const containerReceitas = document.getElementById("containerReceitas");
  const feedEmpty = document.getElementById("feedEmpty");
  const formNovaReceita = document.getElementById("formNovaReceita");
  const fotoVideoReceitaInput = document.getElementById("fotoVideoReceita");
  const previewImagem = document.getElementById("previewImagem");
  const fileUploadPlaceholder = document.getElementById("fileUploadPlaceholder");

  // Modal elements
  const recipeModalOverlay = document.getElementById("recipeModalOverlay");
  const closeRecipeModalBtn = document.getElementById("closeRecipeModal");
  const openRecipeModalBtn = document.getElementById("openRecipeModal");
  const openRecipeModalPhoto = document.getElementById("openRecipeModalPhoto");
  const openRecipeModalRecipe = document.getElementById("openRecipeModalRecipe");

  // Profile modal
  const profileModalOverlay = document.getElementById("profileModalOverlay");
  const closeProfileModalBtn = document.getElementById("closeProfileModal");
  const btnEditProfile = document.getElementById("btnEditProfile");
  const formEditProfile = document.getElementById("formEditProfile");

  // Settings modal
  const settingsModalOverlay = document.getElementById("settingsModalOverlay");
  const closeSettingsModalBtn = document.getElementById("closeSettingsModal");
  const btnSettings = document.getElementById("btnSettings");
  const formSettings = document.getElementById("formSettings");

  // Header
  const headerUserMenu = document.getElementById("headerUserMenu");
  const btnLogout = document.getElementById("btnLogout");

  // ===== LOAD USER DATA =====
  function loadUserData() {
    const userData = JSON.parse(localStorage.getItem("userData")) || {
      name: "Usuário",
      email: "",
      bio: "Apaixonado(a) por culinária 🍳",
      location: "",
      profilePhoto: "",
    };

    // Update all user-related elements
    const nameElements = [
      document.getElementById("headerUsername"),
      document.getElementById("profileName"),
      document.getElementById("modalUsername"),
    ];
    nameElements.forEach((el) => {
      if (el) el.textContent = userData.name;
    });

    const bioEl = document.getElementById("profileBio");
    if (bioEl) {
      let bioText = userData.bio || "Apaixonado(a) por culinária 🍳";
      if (userData.location) bioText += ` 📍 ${userData.location}`;
      bioEl.textContent = bioText;
    }

    // Update avatars if custom photo
    if (userData.profilePhoto) {
      const avatarElements = document.querySelectorAll(
        "#headerAvatar, #profileAvatar, #createPostAvatar, #modalAvatar, #editProfileAvatarPreview"
      );
      avatarElements.forEach((el) => {
        if (el) el.src = userData.profilePhoto;
      });
    }

    // Update stats
    const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    const userReceitas = receitas.filter(
      (r) => r.nomeChef === userData.name
    ).length;
    const statReceitas = document.getElementById("statReceitas");
    if (statReceitas) statReceitas.textContent = userReceitas;

    // Count total likes received
    let totalLikes = 0;
    receitas.forEach((r) => {
      if (r.nomeChef === userData.name) {
        totalLikes += (r.likes || 0);
      }
    });
    const statCurtidas = document.getElementById("statCurtidas");
    if (statCurtidas) statCurtidas.textContent = totalLikes;

    // Fill edit form
    const editName = document.getElementById("editName");
    const editBio = document.getElementById("editBio");
    const editLocation = document.getElementById("editLocation");
    if (editName) editName.value = userData.name;
    if (editBio) editBio.value = userData.bio || "";
    if (editLocation) editLocation.value = userData.location || "";

    return userData;
  }

  const currentUser = loadUserData();

  // ===== DEFAULT FOOD IMAGES (for posts without photos) =====
  const defaultFoodImages = [
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  function getRandomFoodImage() {
    return defaultFoodImages[Math.floor(Math.random() * defaultFoodImages.length)];
  }

  // ===== HEADER DROPDOWN =====
  if (headerUserMenu) {
    headerUserMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      headerUserMenu.classList.toggle("open");
      // Close notifications if open
      const notifDropdown = document.getElementById("notificationsDropdown");
      if (notifDropdown) notifDropdown.classList.remove("open");
    });
  }

  // ===== NOTIFICATIONS =====
  const btnNotifications = document.getElementById("btnNotifications");
  const notificationsDropdown = document.getElementById("notificationsDropdown");
  const notifBadge = document.getElementById("notifBadge");
  const markAllRead = document.getElementById("markAllRead");

  if (btnNotifications && notificationsDropdown) {
    btnNotifications.addEventListener("click", (e) => {
      e.stopPropagation();
      notificationsDropdown.classList.toggle("open");
      // Close user dropdown if open
      if (headerUserMenu) headerUserMenu.classList.remove("open");
    });

    notificationsDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  if (markAllRead) {
    markAllRead.addEventListener("click", () => {
      document.querySelectorAll(".notif-item.unread").forEach((item) => {
        item.classList.remove("unread");
        const dot = item.querySelector(".notif-dot");
        if (dot) dot.remove();
      });
      if (notifBadge) notifBadge.classList.add("hidden");
      showToast("Todas as notificações marcadas como lidas ✓", "info");
    });
  }

  // Close dropdowns on outside click
  document.addEventListener("click", () => {
    if (headerUserMenu) headerUserMenu.classList.remove("open");
    if (notificationsDropdown) notificationsDropdown.classList.remove("open");
  });

  // ===== LOGOUT =====
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      showToast("Até mais! 👋", "info");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 800);
    });
  }

  // ===== RECIPE MODAL =====
  function openModal(overlay) {
    if (overlay) overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal(overlay) {
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  [openRecipeModalBtn, openRecipeModalPhoto, openRecipeModalRecipe].forEach(
    (btn) => {
      if (btn) {
        btn.addEventListener("click", () => openModal(recipeModalOverlay));
      }
    }
  );

  if (closeRecipeModalBtn) {
    closeRecipeModalBtn.addEventListener("click", () =>
      closeModal(recipeModalOverlay)
    );
  }

  if (recipeModalOverlay) {
    recipeModalOverlay.addEventListener("click", (e) => {
      if (e.target === recipeModalOverlay) closeModal(recipeModalOverlay);
    });
  }

  // ===== PROFILE MODAL =====
  if (btnEditProfile) {
    btnEditProfile.addEventListener("click", (e) => {
      e.preventDefault();
      headerUserMenu.classList.remove("open");
      openModal(profileModalOverlay);
    });
  }

  if (closeProfileModalBtn) {
    closeProfileModalBtn.addEventListener("click", () =>
      closeModal(profileModalOverlay)
    );
  }

  if (profileModalOverlay) {
    profileModalOverlay.addEventListener("click", (e) => {
      if (e.target === profileModalOverlay) closeModal(profileModalOverlay);
    });
  }

  // ===== SETTINGS MODAL =====
  if (btnSettings) {
    btnSettings.addEventListener("click", (e) => {
      e.preventDefault();
      headerUserMenu.classList.remove("open");
      openModal(settingsModalOverlay);
    });
  }

  if (closeSettingsModalBtn) {
    closeSettingsModalBtn.addEventListener("click", () =>
      closeModal(settingsModalOverlay)
    );
  }

  if (settingsModalOverlay) {
    settingsModalOverlay.addEventListener("click", (e) => {
      if (e.target === settingsModalOverlay) closeModal(settingsModalOverlay);
    });
  }

  if (formSettings) {
    formSettings.addEventListener("submit", (e) => {
      e.preventDefault();
      closeModal(settingsModalOverlay);
      showToast("Configurações salvas com sucesso! ⚙️", "success");
    });
  }

  // ===== PROFILE EDIT FORM =====
  const editProfilePhotoInput = document.getElementById("editProfilePhoto");
  if (editProfilePhotoInput) {
    editProfilePhotoInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const preview = document.getElementById("editProfileAvatarPreview");
          if (preview) preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (formEditProfile) {
    formEditProfile.addEventListener("submit", (e) => {
      e.preventDefault();

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      userData.name = document.getElementById("editName").value.trim() || userData.name;
      userData.bio = document.getElementById("editBio").value.trim();
      userData.location = document.getElementById("editLocation").value.trim();

      // Profile photo
      const preview = document.getElementById("editProfileAvatarPreview");
      if (preview && preview.src.startsWith("data:image")) {
        userData.profilePhoto = preview.src;
      }

      localStorage.setItem("userData", JSON.stringify(userData));
      loadUserData();
      closeModal(profileModalOverlay);
      showToast("Perfil atualizado com sucesso! ✨", "success");
    });
  }

  // ===== IMAGE PREVIEW FOR RECIPE =====
  if (fotoVideoReceitaInput) {
    fotoVideoReceitaInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImagem.src = e.target.result;
          previewImagem.style.display = "block";
          if (fileUploadPlaceholder)
            fileUploadPlaceholder.style.display = "none";
        };
        reader.readAsDataURL(file);
      } else {
        previewImagem.src = "#";
        previewImagem.style.display = "none";
        if (fileUploadPlaceholder)
          fileUploadPlaceholder.style.display = "block";
      }
    });
  }

  // ===== SUBMIT RECIPE =====
  if (formNovaReceita) {
    formNovaReceita.addEventListener("submit", function (event) {
      event.preventDefault();

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      const titulo = document.getElementById("tituloReceita").value.trim();
      const categoria = document.getElementById("categoriaReceita").value;
      const ingredientes = document.getElementById("ingredientes").value.trim();
      const modoPreparo = document.getElementById("modoPreparo").value.trim();
      const tempoPreparo = document.getElementById("tempoPreparo").value.trim();

      let imagemParaSalvar = "";

      if (
        previewImagem &&
        previewImagem.src &&
        previewImagem.src.startsWith("data:image")
      ) {
        imagemParaSalvar = previewImagem.src;
      } else {
        // Always use a food image even if user doesn't upload one
        imagemParaSalvar = getRandomFoodImage();
      }

      const novaReceita = {
        id: Date.now(),
        nomeChef: userData.name || "Chef Anônimo",
        avatarUrl: userData.profilePhoto || `https://i.pravatar.cc/40?u=${Date.now()}`,
        titulo: titulo,
        categoria: categoria,
        ingredientes: ingredientes,
        modoPreparo: modoPreparo,
        tempoPreparo: tempoPreparo,
        imagemUrl: imagemParaSalvar,
        likes: 0,
        likedByMe: false,
        comentarios: [],
        timestamp: new Date().toISOString(),
      };

      adicionarReceitaAoFeed(novaReceita);
      salvarReceita(novaReceita);

      formNovaReceita.reset();
      previewImagem.style.display = "none";
      previewImagem.src = "#";
      if (fileUploadPlaceholder) fileUploadPlaceholder.style.display = "block";

      closeModal(recipeModalOverlay);
      showToast("Receita publicada! 🎉", "success");

      // Update stats
      loadUserData();
    });
  }

  // ===== ADD RECIPE TO FEED =====
  function adicionarReceitaAoFeed(receita) {
    if (feedEmpty) feedEmpty.style.display = "none";

    const cardReceita = document.createElement("div");
    cardReceita.classList.add("card-receita");
    cardReceita.dataset.id = receita.id;

    const timeAgo = getTimeAgo(receita.timestamp);
    const avatarSrc = receita.avatarUrl || `https://i.pravatar.cc/42?u=${receita.id}`;
    const categoriaFormatada = formatarCategoria(receita.categoria);
    const tempoHtml = receita.tempoPreparo
      ? `<span class="tempo-preparo"><i class="fas fa-clock"></i> ${receita.tempoPreparo}</span>`
      : "";

    // Always show a food image - use recipe image or random default
    const imageSrc = (receita.imagemUrl && receita.imagemUrl.length > 0)
      ? receita.imagemUrl
      : getRandomFoodImage();
    const imageHtml = `<div class="card-image"><img src="${imageSrc}" alt="${receita.titulo}" loading="lazy" /></div>`;

    cardReceita.innerHTML = `
      <div class="card-user-info">
        <img src="${avatarSrc}" alt="Avatar" />
        <div class="user-details">
          <span class="username">${receita.nomeChef || "Chef Anônimo"}</span>
          <span class="post-time">${timeAgo}</span>
        </div>
        <button class="card-menu-btn"><i class="fas fa-ellipsis"></i></button>
      </div>
      ${imageHtml}
      <div class="card-content">
        <h3>${receita.titulo}</h3>
        <span class="categoria">${categoriaFormatada}</span>
        ${tempoHtml}
        <div class="recipe-details">
          <div class="recipe-section recipe-ingredients">
            <h4><i class="fas fa-list-check"></i> Ingredientes</h4>
            <p>${receita.ingredientes}</p>
          </div>
          <div class="recipe-section recipe-preparation">
            <h4><i class="fas fa-fire-burner"></i> Modo de Preparo</h4>
            <p>${receita.modoPreparo || "Não informado."}</p>
          </div>
        </div>
        <a class="toggle-recipe-link"><i class="fas fa-chevron-down"></i> Ver receita completa</a>
      </div>
      <div class="card-actions">
        <div class="action-counts">
          <span class="like-count">${receita.likes || 0} curtida${(receita.likes || 0) !== 1 ? "s" : ""}</span>
          <span class="comment-count">${(receita.comentarios || []).length} comentário${(receita.comentarios || []).length !== 1 ? "s" : ""}</span>
        </div>
        <div class="action-buttons">
          <button class="action-btn btn-like ${receita.likedByMe ? "liked" : ""}">
            <i class="fa${receita.likedByMe ? "s" : "r"} fa-heart"></i>
            <span>Curtir</span>
          </button>
          <button class="action-btn btn-comment">
            <i class="far fa-comment"></i>
            <span>Comentar</span>
          </button>
          <button class="action-btn btn-share">
            <i class="far fa-share-from-square"></i>
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
      <div class="comment-section">
        <div class="comment-list"></div>
        <div class="comment-input-wrapper">
          <img src="${getCurrentUserAvatar()}" alt="Você" />
          <input type="text" placeholder="Escreva um comentário..." class="comment-input" />
          <button class="comment-send-btn"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    `;

    // ===== EVENT: TOGGLE RECIPE =====
    const toggleLink = cardReceita.querySelector(".toggle-recipe-link");
    const recipeDetails = cardReceita.querySelector(".recipe-details");
    if (toggleLink && recipeDetails) {
      toggleLink.addEventListener("click", (e) => {
        e.preventDefault();
        recipeDetails.classList.toggle("expanded");
        if (recipeDetails.classList.contains("expanded")) {
          toggleLink.innerHTML =
            '<i class="fas fa-chevron-up"></i> Ocultar receita';
        } else {
          toggleLink.innerHTML =
            '<i class="fas fa-chevron-down"></i> Ver receita completa';
        }
      });
    }

    // ===== EVENT: LIKE =====
    const btnLike = cardReceita.querySelector(".btn-like");
    const likeCountEl = cardReceita.querySelector(".like-count");
    if (btnLike) {
      btnLike.addEventListener("click", () => {
        const receitaId = parseInt(cardReceita.dataset.id);
        const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
        const idx = receitas.findIndex((r) => r.id === receitaId);

        if (idx !== -1) {
          if (receitas[idx].likedByMe) {
            receitas[idx].likes = Math.max(0, (receitas[idx].likes || 1) - 1);
            receitas[idx].likedByMe = false;
            btnLike.classList.remove("liked");
            btnLike.querySelector("i").className = "far fa-heart";
          } else {
            receitas[idx].likes = (receitas[idx].likes || 0) + 1;
            receitas[idx].likedByMe = true;
            btnLike.classList.add("liked");
            btnLike.querySelector("i").className = "fas fa-heart";
          }

          localStorage.setItem("receitas", JSON.stringify(receitas));
          const count = receitas[idx].likes;
          likeCountEl.textContent = `${count} curtida${count !== 1 ? "s" : ""}`;

          // Update profile stats
          loadUserData();
        }
      });
    }

    // ===== EVENT: COMMENT TOGGLE =====
    const btnComment = cardReceita.querySelector(".btn-comment");
    const commentSection = cardReceita.querySelector(".comment-section");
    if (btnComment && commentSection) {
      btnComment.addEventListener("click", () => {
        commentSection.classList.toggle("open");
        if (commentSection.classList.contains("open")) {
          const input = commentSection.querySelector(".comment-input");
          if (input) input.focus();
        }
      });
    }

    // Load existing comments
    const commentList = cardReceita.querySelector(".comment-list");
    if (receita.comentarios && receita.comentarios.length > 0) {
      receita.comentarios.forEach((c) => addCommentToDOM(commentList, c));
    }

    // ===== EVENT: SEND COMMENT =====
    const commentInput = cardReceita.querySelector(".comment-input");
    const commentSendBtn = cardReceita.querySelector(".comment-send-btn");
    const commentCountEl = cardReceita.querySelector(".comment-count");

    function sendComment() {
      const text = commentInput.value.trim();
      if (!text) return;

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      const comment = {
        id: Date.now(),
        author: userData.name || "Usuário",
        avatar: userData.profilePhoto || `https://i.pravatar.cc/32?u=me`,
        text: text,
        timestamp: new Date().toISOString(),
      };

      // Save to localStorage
      const receitaId = parseInt(cardReceita.dataset.id);
      const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
      const idx = receitas.findIndex((r) => r.id === receitaId);
      if (idx !== -1) {
        if (!receitas[idx].comentarios) receitas[idx].comentarios = [];
        receitas[idx].comentarios.push(comment);
        localStorage.setItem("receitas", JSON.stringify(receitas));

        const count = receitas[idx].comentarios.length;
        commentCountEl.textContent = `${count} comentário${count !== 1 ? "s" : ""}`;
      }

      // Add to DOM
      addCommentToDOM(commentList, comment);
      commentInput.value = "";

      // Auto-scroll to bottom
      commentList.scrollTop = commentList.scrollHeight;
    }

    if (commentSendBtn) {
      commentSendBtn.addEventListener("click", sendComment);
    }
    if (commentInput) {
      commentInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendComment();
      });
    }

    // ===== EVENT: SHARE =====
    const btnShare = cardReceita.querySelector(".btn-share");
    if (btnShare) {
      btnShare.addEventListener("click", () => {
        showToast("Link da receita copiado! 📋", "info");
      });
    }

    // ===== EVENT: COMMENT COUNT CLICK =====
    if (commentCountEl) {
      commentCountEl.addEventListener("click", () => {
        commentSection.classList.add("open");
      });
    }

    containerReceitas.prepend(cardReceita);
  }

  // ===== ADD COMMENT TO DOM =====
  function addCommentToDOM(container, comment) {
    const commentEl = document.createElement("div");
    commentEl.classList.add("comment-item");
    commentEl.innerHTML = `
      <img src="${comment.avatar || "https://i.pravatar.cc/32?u=" + comment.id}" alt="${comment.author}" />
      <div class="comment-body">
        <div class="comment-bubble">
          <strong>${comment.author}</strong>
          <p>${comment.text}</p>
        </div>
        <span class="comment-time">${getTimeAgo(comment.timestamp)}</span>
      </div>
    `;
    container.appendChild(commentEl);
  }

  // ===== HELPERS =====
  function getCurrentUserAvatar() {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    return userData.profilePhoto || "https://i.pravatar.cc/32?u=me";
  }

  function formatarCategoria(categoriaValue) {
    if (!categoriaValue) return "";
    const map = {
      salgados: "🥘 Salgados",
      doces: "🍰 Doces",
      entradas: "🥗 Entradas & Petiscos",
      sobremesas: "🍮 Sobremesas",
      "prato-principal": "🍖 Prato Principal",
      acompanhamentos: "🥦 Acompanhamentos",
      caldos: "🍲 Caldos & Sopas",
    };
    return map[categoriaValue] || categoriaValue;
  }

  function getTimeAgo(timestamp) {
    if (!timestamp) return "agora";
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return "agora";
    if (diffMin < 60) return `${diffMin} min`;
    if (diffHour < 24) return `${diffHour}h`;
    if (diffDay < 7) return `${diffDay}d`;
    return then.toLocaleDateString("pt-BR");
  }

  // ===== SAVE RECIPE =====
  function salvarReceita(receita) {
    let receitasStorage = JSON.parse(localStorage.getItem("receitas")) || [];
    receitasStorage.unshift(receita);
    localStorage.setItem("receitas", JSON.stringify(receitasStorage));
  }

  // ===== LOAD RECIPES =====
  function carregarReceitas() {
    let receitasSalvas = JSON.parse(localStorage.getItem("receitas")) || [];

    // If first time, load example recipes
    if (receitasSalvas.length === 0) {
      receitasSalvas = getExampleRecipes();
      localStorage.setItem("receitas", JSON.stringify(receitasSalvas));
    }

    containerReceitas.innerHTML = "";

    if (receitasSalvas.length === 0) {
      if (feedEmpty) feedEmpty.style.display = "block";
      return;
    }

    // Load in reverse order so prepend puts them in correct order
    const reversed = [...receitasSalvas].reverse();
    reversed.forEach((receita) => {
      if (receita && receita.titulo) {
        adicionarReceitaAoFeed(receita);
      }
    });
  }

  // ===== EXAMPLE RECIPES =====
  function getExampleRecipes() {
    return [
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
        comentarios: [
          {
            id: 1,
            author: "Ana Cozinha",
            avatar: "https://i.pravatar.cc/32?u=chef1",
            text: "Receita maravilhosa! Fiz ontem e ficou perfeito! 🍮",
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
        comentarios: [
          {
            id: 3,
            author: "Maria Doces",
            avatar: "https://i.pravatar.cc/32?u=chef3",
            text: "Esse bolo é o melhor que já fiz! A família amou 🎂",
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
        comentarios: [],
        timestamp: new Date(Date.now() - 172800000).toISOString(),
      },
    ];
  }

  // ===== SEARCH =====
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = containerReceitas.querySelectorAll(".card-receita");

      cards.forEach((card) => {
        const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const username =
          card.querySelector(".username")?.textContent.toLowerCase() || "";
        const cat =
          card.querySelector(".categoria")?.textContent.toLowerCase() || "";

        if (
          query === "" ||
          title.includes(query) ||
          username.includes(query) ||
          cat.includes(query)
        ) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // ===== CATEGORY FILTER =====
  document.querySelectorAll(".tag[data-category]").forEach((tag) => {
    tag.addEventListener("click", () => {
      document.querySelectorAll(".tag").forEach((t) => t.classList.remove("active"));
      tag.classList.add("active");

      const category = tag.dataset.category;
      const receitas = JSON.parse(localStorage.getItem("receitas")) || [];

      containerReceitas.innerHTML = "";

      let filtered = receitas;
      if (category !== "all") {
        filtered = receitas.filter((r) => r.categoria === category);
      }

      if (filtered.length === 0) {
        if (feedEmpty) feedEmpty.style.display = "block";
        return;
      }

      if (feedEmpty) feedEmpty.style.display = "none";

      const reversed = [...filtered].reverse();
      reversed.forEach((receita) => {
        if (receita && receita.titulo) {
          adicionarReceitaAoFeed(receita);
        }
      });
    });
  });

  // ===== FOLLOW BUTTONS =====
  document.querySelectorAll(".btn-follow").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.textContent === "Seguir") {
        btn.textContent = "Seguindo";
        btn.style.background = "var(--primary)";
        btn.style.color = "white";
        btn.style.borderColor = "var(--primary)";
        showToast("Você está seguindo este chef! 👨‍🍳", "success");
      } else {
        btn.textContent = "Seguir";
        btn.style.background = "transparent";
        btn.style.color = "var(--primary)";
        btn.style.borderColor = "var(--primary)";
      }
    });
  });

  // ===== KEYBOARD SHORTCUT: ESC to close modals & dropdowns =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(recipeModalOverlay);
      closeModal(profileModalOverlay);
      closeModal(settingsModalOverlay);
      if (notificationsDropdown) notificationsDropdown.classList.remove("open");
      if (headerUserMenu) headerUserMenu.classList.remove("open");
    }
  });

  // ===== INIT =====
  carregarReceitas();
});
