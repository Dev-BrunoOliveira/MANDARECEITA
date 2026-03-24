import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
  
    navigate('/principal');
  };

  return (
    <div className="login-container">
      <div className="background-section">
        <div className="welcome-text">
          <h1>Descubra e compartilhe <br />suas receitas favoritas</h1>
          <p>Entre para um mundo de sabores!</p>
        </div>
      </div>

      <div className="form-section">
        <div className="form-box">
          <div className="logo-container">
            <h2>Manda Receita</h2>
          </div>
          <h3>Bem-vindo(a) de volta!</h3>

          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Seu email"
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Sua senha"
                required
              />
              <span className="toggle-password" onClick={togglePassword}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>

            <a href="#" className="forgot-password">Esqueceu sua senha?</a>
            <button type="submit" className="btn btn-login">Entrar</button>
          </form>

          <div className="separator">OU</div>

          <button type="button" className="btn btn-google">
            <i className="fab fa-google"></i> Continuar com o Google
          </button>

          <div className="terms">
            Ao continuar, você concorda com os <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>.
          </div>

          <hr className="form-divider" />

          <div className="signup-link">
            Ainda não está no Manda Receita? <Link to="/register">Crie uma conta</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;