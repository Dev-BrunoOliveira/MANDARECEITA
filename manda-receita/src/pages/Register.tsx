import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

const Register: React.FC = () => {
  const { register, loginGoogle } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    if (!fullName.trim()) {
      setNameError(true);
      showToast("Por favor, preencha seu nome.", "error");
      return;
    }

    if (!email.trim()) {
      setEmailError(true);
      showToast("Por favor, preencha o email.", "error");
      return;
    }

    if (!password) {
      setPasswordError(true);
      showToast("Por favor, preencha a senha.", "error");
      return;
    }

    if (password.length < 6) {
      setPasswordError(true);
      showToast("A senha deve ter pelo menos 6 caracteres.", "error");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      showToast("As senhas não coincidem!", "error");
      return;
    }

    if (!agreeTerms) {
      showToast("Você precisa concordar com os Termos de Serviço.", "error");
      return;
    }

    register(fullName.trim(), email.trim());
    showToast("Conta criada com sucesso! Faça login.", "success");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleGoogleSignUp = () => {
    loginGoogle();
    showToast("Cadastro com Google realizado!", "success");
    setTimeout(() => {
      navigate("/principal");
    }, 600);
  };

  return (
    <div className="login-container">
      <div className="background-section">
        <div className="overlay-particles"></div>
        <div className="welcome-text">
          <h1>
            Junte-se à nossa <br />
            comunidade de cozinheiros!
          </h1>
          <p>Compartilhe suas criações e inspire-se.</p>
          <div className="features-list">
            <div className="feature-item">
              <i className="fas fa-user-circle"></i>
              <span>Crie seu perfil</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-utensils"></i>
              <span>Compartilhe receitas</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-users"></i>
              <span>Conecte-se</span>
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-box">
          <div className="logo-container">
            <h2>Manda Receita</h2>
          </div>
          <h3>Crie sua conta</h3>

          <form id="registerForm" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="fullName">Nome Completo</label>
              <div className="input-wrapper">
                <i className="fas fa-user input-icon"></i>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Seu nome completo"
                  className={nameError ? "error" : ""}
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setNameError(false);
                  }}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  className={emailError ? "error" : ""}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Mínimo 6 caracteres"
                  className={passwordError ? "error" : ""}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <div className="input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirme sua senha"
                  className={confirmPasswordError ? "error" : ""}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError(false);
                  }}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
            </div>

            <div className="terms-register">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label htmlFor="agreeTerms" className="checkbox-label">
                Eu li e concordo com os <a href="#">Termos de Serviço</a> e a <a href="#">Política de Privacidade</a>.
              </label>
            </div>

            <button type="submit" className="btn btn-login">
              <span>Criar Conta</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <div className="separator">
            <span>OU</span>
          </div>

          <button type="button" className="btn btn-google" onClick={handleGoogleSignUp}>
            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Cadastre-se com o Google
          </button>

          <hr className="form-divider" />

          <div className="signup-link">
            Já tem uma conta? <Link to="/">Faça login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;