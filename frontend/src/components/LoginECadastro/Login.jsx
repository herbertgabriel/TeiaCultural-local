import { useState, useEffect } from 'react';
import "./LoginECadastro.css";
import { FaFacebook, FaGoogle } from "react-icons/fa";

function Login({ onLogin, onToggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberEmail(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { acessToken, expiresIn } = data;

        // Armazenar o acessToken no localStorage
        localStorage.setItem('acessToken', acessToken);
        localStorage.setItem('expiresIn', new Date().getTime() + expiresIn * 1000);

        // Armazenar o email no localStorage se o checkbox estiver marcado
        if (rememberEmail) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Atualizar o estado de login
        onLogin();
      } else if (response.status === 401) {
        setErrorMessage('Email ou senha incorretos');
      } else {
        setErrorMessage('Ocorreu um erro. Por favor, tente novamente.');
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro. Por favor, tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={rememberEmail}
            onChange={(e) => setRememberEmail(e.target.checked)}
          />
          <label>Lembrar email</label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <div className="container-align">
        <div className="FacebookEGoogle">
          <FaGoogle />
          <FaFacebook />
        </div>
        <p>
          Não tem uma conta? <span onClick={onToggleForm}>Cadastrar</span>
        </p>
      </div>
    </div>
  );
}

export default Login;