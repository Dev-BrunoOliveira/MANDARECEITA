// script_index.js (anteriormente script_login.js)

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        window.location.href = "principal.html";
      } else {
        alert("Por favor, preencha email e senha.");
      }
    });
  }
});

// --- GOOGLE LOGIN (Simulação e Redirecionamento) ---
const GOOGLE_CLIENT_ID = "SEU_ID_DE_CLIENTE_DO_GOOGLE_AQUI"; // Mantenha seu ID aqui se for usar

function initGoogleSignIn() {
  if (typeof gapi !== "undefined") {
    gapi.load("auth2", function () {
      const auth2 = gapi.auth2
        .init({
          // Guardar a instância do auth2
          client_id: GOOGLE_CLIENT_ID,
          scope: "profile email openid",
        })
        .then(() => {
          console.log("Google API initialized for login page.");
          // Anexa o evento ao botão de login com Google na página de login
          const googleLoginButton = document.querySelector(".btn-google");
          if (googleLoginButton) {
            attachGoogleSignIn(googleLoginButton, auth2); // Passa a instância auth2
          } else {
            console.warn("Botão de login com Google não encontrado na página.");
          }
        })
        .catch((error) => {
          console.error("Error initializing Google API:", error);
        });
    });
  } else {
    console.error("Google API script (platform.js) not loaded yet.");
  }
}

function attachGoogleSignIn(element, auth2Instance) {
  if (!element || !auth2Instance) return;

  element.addEventListener("click", function () {
    auth2Instance
      .signIn()
      .then(function (googleUser) {
        const profile = googleUser.getBasicProfile();
        alert(
          `Login simulado com Google (Usuário: ${profile.getName()})! Redirecionando...`
        );
        window.location.href = "recipes.html";
      })
      .catch(function (error) {
        console.error("Google Sign-In error:", error);
        if (error.error === "popup_closed_by_user") {
          alert("Você fechou a janela de login do Google.");
        } else if (error.error === "access_denied") {
          alert("Você negou o acesso à sua conta Google.");
        } else {
          alert(
            "Erro ao tentar fazer login com o Google. Verifique o console."
          );
        }
      });
  });
}

function togglePasswordVisibility(inputId, iconId) {
  const passwordInput = document.getElementById(inputId || "password");
  const iconElement = document.getElementById(iconId);

  if (!passwordInput || !iconElement) {
    return;
  }

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    iconElement.classList.remove("fa-eye");
    iconElement.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    iconElement.classList.remove("fa-eye-slash");
    iconElement.classList.add("fa-eye");
  }
}

// Chamar initGoogleSignIn quando o DOM estiver pronto e a API do Google carregada
// Uma forma mais segura de garantir que `gapi` esteja carregado antes de chamar `initGoogleSignIn`
// é usar o callback `onload` no script do Google.
// No seu HTML (novo index.html, antigo login.html):
// <script src="https://apis.google.com/js/platform.js?onload=onGoogleApiLoad" async defer></script>
// E então definir a função global:
/*
function onGoogleApiLoad() {
    console.log('Google API successfully loaded via onload callback.');
    initGoogleSignIn();
}
*/
// Se não usar o callback onload, a chamada abaixo pode ser feita,
// mas é menos garantido que gapi estará pronto imediatamente.
document.addEventListener("DOMContentLoaded", () => {
  // Tenta inicializar o Google Sign-In.
  // É melhor usar o callback onload=onGoogleApiLoad como descrito acima.
  // Se não, pode haver uma condição de corrida onde gapi ainda não está definido.
  if (typeof gapi !== "undefined" && gapi.auth2) {
    // Verifica se auth2 já foi carregado
    initGoogleSignIn();
  } else if (typeof gapi !== "undefined") {
    initGoogleSignIn();
  } else {
    console.log(
      "DOMContentLoaded: Tentando initGoogleSignIn. Use o callback onload para maior robustez."
    );

    setTimeout(() => {
      if (typeof gapi !== "undefined") {
        initGoogleSignIn();
      } else {
        console.error(
          "gapi ainda não está definido após DOMContentLoaded e timeout. Verifique o carregamento do script do Google e use o callback onload."
        );
      }
    }, 500);
  }
});
