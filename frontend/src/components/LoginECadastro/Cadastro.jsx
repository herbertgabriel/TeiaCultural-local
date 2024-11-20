import { useState } from 'react';
import "./LoginECadastro.css";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { validarCPF } from '../../utils/validarCPF'; 

function Cadastro({ onToggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [telephone, setTelephone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validarTelefone = (telefone) => {
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/; // Aceita formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
    return telefoneRegex.test(telefone);
  };

  const handleTelefoneChange = (e) => {
    const formattedTelefone = formatarTelefone(e.target.value);
    setTelephone(formattedTelefone);
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (!validarNome(name)) {
      setErrorMessage('Nome inválido. Não pode conter números.');
      return;
    }
    if (!validarEmail(email)) {
      setErrorMessage('Email inválido');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('A senha deve ter no mínimo 6 dígitos');
      return;
    }
    if (!validarCPF(cpf)) {
      setErrorMessage('CPF inválido');
      return;
    }
    if (!validarTelefone(telephone)) {
      setErrorMessage('Telefone inválido');
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, cpf, telephone }),
      });

      if (response.ok) {
        setSuccessMessage('Conta cadastrada com sucesso!');
        setErrorMessage('');
        // Limpar os campos do formulário
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setCpf('');
        setTelephone('');
        // Fechar o formulário após um curto período de tempo
        setTimeout(() => {
          onToggleForm();
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Ocorreu um erro. Email ou CPF já cadastrado.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro. Email ou CPF já cadastrado.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      <form onSubmit={handleCadastro}>
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={telephone}
          onChange={handleTelefoneChange}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme a Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Cadastrar</button>
      </form>
      <div className="container-align">
        <div className="FacebookEGoogle">
          <FaGoogle />
          <FaFacebook />
        </div>
        <p>
          Já tem uma conta? <span onClick={onToggleForm}>Entrar</span>
        </p>
      </div>
    </div>
  );
}

function validarNome(nome) {
  const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; // Aceita apenas letras e espaços
  return nomeRegex.test(nome);
}

function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email
  return emailRegex.test(email);
}

function formatarTelefone(telefone) {
  telefone = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
  telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona parênteses ao DDD
  telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2'); // Adiciona hífen entre o quarto e o quinto dígito
  return telefone;
}

export default Cadastro;