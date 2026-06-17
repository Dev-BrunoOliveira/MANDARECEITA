// ===== TOAST NOTIFICATION SYSTEM =====
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

// ===== TOGGLE PASSWORD =====
function togglePasswordVisibility(inputId, iconId) {
  const passwordInput = document.getElementById(inputId || "password");
  const iconElement = document.getElementById(iconId);

  if (!passwordInput) return;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    if (iconElement) {
      iconElement.classList.remove("fa-eye");
      iconElement.classList.add("fa-eye-slash");
    }
  } else {
    passwordInput.type = "password";
    if (iconElement) {
      iconElement.classList.remove("fa-eye-slash");
      iconElement.classList.add("fa-eye");
    }
  }
}

// ===== LOGIN FORM =====
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const googleLoginButton = document.getElementById("googleLoginButton");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      // Clear previous errors
      emailInput.classList.remove("error");
      passwordInput.classList.remove("error");

      if (!email) {
        emailInput.classList.add("error");
        showToast("Por favor, preencha o email.", "error");
        emailInput.focus();
        return;
      }

      if (!password) {
        passwordInput.classList.add("error");
        showToast("Por favor, preencha a senha.", "error");
        passwordInput.focus();
        return;
      }

      if (password.length < 6) {
        passwordInput.classList.add("error");
        showToast("A senha deve ter pelo menos 6 caracteres.", "error");
        return;
      }

      // Save user data
      const userName = email.split("@")[0];
      const capitalizedName =
        userName.charAt(0).toUpperCase() + userName.slice(1);

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      userData.email = email;
      if (!userData.name) userData.name = capitalizedName;
      if (!userData.bio) userData.bio = "Apaixonado(a) por culinária 🍳";
      if (!userData.location) userData.location = "";
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");

      showToast("Login realizado com sucesso!", "success");

      setTimeout(() => {
        window.location.href = "principal.html";
      }, 800);
    });
  }

  // Google Login (simulation)
  if (googleLoginButton) {
    googleLoginButton.addEventListener("click", () => {
      const userData = {
        name: "Usuário Google",
        email: "usuario@gmail.com",
        bio: "Conectado via Google 🍳",
        location: "",
        profilePhoto: "",
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");

      showToast("Login com Google realizado!", "success");

      setTimeout(() => {
        window.location.href = "principal.html";
      }, 800);
    });
  }

  // Remove error class on input focus
  document.querySelectorAll(".input-group input").forEach((input) => {
    input.addEventListener("focus", () => {
      input.classList.remove("error");
    });
  });
});
