import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reaproveitamos o CSS, já que o layout é o mesmo

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <div className="login-container">
      <div className="background-section">
        <div className="welcome-text">
          <h1>Junte-se à nossa <br />comunidade de cozinheiros(a)!</h1>
          <p>Compartilhe suas criações e inspire-se.</p>
        </div>
      </div>

      <div className="form-section">
        <div className="form-box">
          <div className="logo-container">
            <h2>Manda Receita</h2>
          </div>
          <h3>Crie sua conta</h3>

          <form id="registerForm">
            <div className="input-group">
              <label htmlFor="fullName">Nome Completo</label>
              <input type="text" id="fullName" placeholder="Seu nome completo" required />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Seu email" required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input 
                type={showPass ? "text" : "password"} 
                id="password" 
                placeholder="Crie uma senha" 
                required 
              />
              <span className="toggle-password" onClick={() => setShowPass(!showPass)}>
                <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input 
                type={showConfirmPass ? "text" : "password"} 
                id="confirmPassword" 
                placeholder="Confirme sua senha" 
                required 
              />
              <span className="toggle-password" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                <i className={`fas ${showConfirmPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>

            <div className="terms-register">
              <input type="checkbox" id="agreeTerms" required />
              <label htmlFor="agreeTerms" className="checkbox-label">
                Eu li e concordo com os <a href="#">Termos de Serviço</a>.
              </label>
            </div>

            <button type="submit" className="btn btn-login">Criar Conta</button>
          </form>

          <div className="separator">OU</div>

          <button type="button" className="btn btn-google">
            <i className="fab fa-google"></i> Cadastre-se com o Google
          </button>

          <hr className="form-divider" />

          <div className="signup-link">
            Já tem uma conta? <a href="#" onClick={() => navigate('/')}>Faça login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;