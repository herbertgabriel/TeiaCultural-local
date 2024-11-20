import { useState } from 'react';
import "./LoginECadastro.css";
import Login from './Login';
import Cadastro from './Cadastro';

function LoginECadastro({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-cadastro-container">
      {isLogin ? (
        <Login onLogin={onLogin} onToggleForm={toggleForm} />
      ) : (
        <Cadastro onLogin={onLogin} onToggleForm={toggleForm} />
      )}
    </div>
  );
}

export default LoginECadastro;