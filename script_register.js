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
  const passwordInput = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!passwordInput) return;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    if (icon) {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  } else {
    passwordInput.type = "password";
    if (icon) {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  }
}

// ===== REGISTER FORM =====
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const fullNameInput = document.getElementById("fullName");
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("confirmPassword");
      const agreeTerms = document.getElementById("agreeTerms");

      const fullName = fullNameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      // Clear previous errors
      [fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(
        (i) => i.classList.remove("error")
      );

      if (!fullName) {
        fullNameInput.classList.add("error");
        showToast("Por favor, preencha seu nome.", "error");
        fullNameInput.focus();
        return;
      }

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

      if (password !== confirmPassword) {
        confirmPasswordInput.classList.add("error");
        showToast("As senhas não coincidem!", "error");
        confirmPasswordInput.focus();
        return;
      }

      if (!agreeTerms.checked) {
        showToast(
          "Você precisa concordar com os Termos de Serviço.",
          "error"
        );
        return;
      }

      // Save user data
      const userData = {
        name: fullName,
        email: email,
        bio: "Apaixonado(a) por culinária 🍳",
        location: "",
        profilePhoto: "",
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      showToast("Conta criada com sucesso! Faça login.", "success");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    });
  }

  // Google Sign Up (simulation)
  const googleSignUpButton = document.getElementById("googleSignUpButton");
  if (googleSignUpButton) {
    googleSignUpButton.addEventListener("click", () => {
      const userData = {
        name: "Usuário Google",
        email: "usuario@gmail.com",
        bio: "Conectado via Google 🍳",
        location: "",
        profilePhoto: "",
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");

      showToast("Cadastro com Google realizado!", "success");

      setTimeout(() => {
        window.location.href = "principal.html";
      }, 800);
    });
  }

  // Remove error class on focus
  document.querySelectorAll(".input-group input").forEach((input) => {
    input.addEventListener("focus", () => {
      input.classList.remove("error");
    });
  });
});