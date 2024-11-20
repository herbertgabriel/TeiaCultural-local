import { useState, useEffect } from 'react';
import "./Navbar.css";
import Logo from "../../assets/logo.svg"; 
import { LuUser } from 'react-icons/lu';
import Button from "../Button/Button";
import { useNavigate } from 'react-router-dom';
import Login from "../../components/LoginECadastro/Login";
import Cadastro from "../../components/LoginECadastro/Cadastro";
import Acessibilidade from "../../components/Acessibilidade/Acessibilidade";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginCadastro, setShowLoginCadastro] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showAcessibilidade, setShowAcessibilidade] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('acessToken');
    const expiresIn = localStorage.getItem('expiresIn');
    const currentTime = new Date().getTime();

    if (token && expiresIn && currentTime < expiresIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem('acessToken');
      localStorage.removeItem('expiresIn');
    }
  }, []);

  const handleLoginClick = () => {
    setIsLogin(true);
    setShowLoginCadastro(true);
  };

  const handleCadastroClick = () => {
    setIsLogin(false);
    setShowLoginCadastro(true);
  };

  const closePopup = () => {
    setShowLoginCadastro(false);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('acessToken');
  //   localStorage.removeItem('expiresIn');
  //   setIsLoggedIn(false);
  //   navigate('/');
  // };

  const handleLogout = () => {
    navigate('/seus-dados');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginCadastro(false);
    window.location.reload();
  };

  const toggleAcessibilidade = () => {
    setShowAcessibilidade(!showAcessibilidade);
  };

  return (
    <header>
      <nav>
        <div className="container-logo">
          <img src={Logo} alt="Logo teia cultural" onClick={() => navigate("/")} />
        </div>
        <div className="container-buttons">
          {isLoggedIn ? (
            <>
              <Button title="Divulgar Serviços" onClick={() => navigate("/planos")} />
              <Button title="Acessibilidade" onClick={toggleAcessibilidade} />
              <Button title="Explorar" onClick={() => navigate("/feed")} />
              <Button onClick={handleLogout} title={<LuUser />} />
            </>
          ) : (
            <>
              <Button title="Acessibilidade" onClick={toggleAcessibilidade} />
              <Button title="Explorar" onClick={() => navigate("/feed")} />
              <Button title="Cadastrar" onClick={handleCadastroClick} />
              <Button title="Entrar" onClick={handleLoginClick} />
            </>
          )}
        </div>
      </nav>
      {showLoginCadastro && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-popup" onClick={closePopup}>X</button>
            {isLogin ? (
              <Login onLogin={handleLoginSuccess} onToggleForm={handleCadastroClick} />
            ) : (
              <Cadastro onLogin={handleLoginSuccess} onToggleForm={handleLoginClick} />
            )}
          </div>
        </div>
      )}
      <Acessibilidade isOpen={showAcessibilidade} />
    </header>
  );
}

export default Navbar;