import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Navbar/Navbar';
import "./Assinatura.css";

const Assinatura = () => {
  const [selectedPlan, setSelectedPlan] = useState('Plano Premium');
  const [userName, setUserName] = useState('@');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const choosePlan = (planName) => {
    setSelectedPlan(planName);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setMessage('');
  };

  const handleSubmit = async () => {
    if (userName.trim() === '@') {
      setMessage('O nome de usuário não pode estar vazio');
      return;
    }

    const token = localStorage.getItem('acessToken');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    const data = {
      username: userName
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/upgrade-to-premium`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMessage('Pedido em análise, você irá receber por email confirmação de pagamento');
        setTimeout(() => {
          navigate('/');
        }, 20000); // Redireciona após 20 segundos
      } else {
        const errorData = await response.json();
        if (errorData.message === 'User already exists') {
          setMessage('Esse usuário já existe');
        } else {
          setMessage('Erro ao atualizar plano');
        }
      }
    } catch (error) {
      console.error('Erro ao enviar dados', error);
      setMessage('Erro ao enviar dados');
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.startsWith('@')) {
      setUserName(value);
    } else {
      setUserName('@' + value);
    }
  };

  return (
    <>
      <Header />
      <main id="body">
        <div className="container">
          <div id="textcentral">
            <h1>O plano certo para sua empresa</h1>
            <p>Entre no mundo da criatividade e cultura no nosso site exclusivo para artesãos</p>
          </div>

          <div className="plans">
            {/* Plano Básico */}
            <div
              className={`plan ${selectedPlan === 'Plano Básico' ? 'selected' : ''}`}
              onClick={() => choosePlan('Plano Básico')}
            >
              <h2>Plano Básico</h2>
              <div className="price">R$ 10/mês</div>
              <ul className="listbeneficios">
                <li>Cadastro Simples: Criação de um perfil profissional para exibir produtos e serviços.</li>
                <li>Galeria de Imagens: Upload de imagens de produtos ou trabalhos.</li>
                <li>Publicações: Faça publicações sobre seu trabalho para que todos possam ver.</li>
                <li>Conteúdo Educativo: Acesso a material e dicas sobre marketing e vendas online.</li>
              </ul>
              <button className="button">Escolher Plano</button>
            </div>

            {/* Plano Padrão */}
            <div
              className={`plan ${selectedPlan === 'Plano Padrão' ? 'selected' : ''}`}
              onClick={() => choosePlan('Plano Padrão')}
            >
              <h2>Plano Padrão</h2>
              <div className="price">R$ 25/mês</div>
              <ul className="listbeneficios">
                <li>Tudo do Plano Básico: Inclui todos os benefícios do plano básico.</li>
                <li>Galeria de Vídeos: Upload de vídeos para mostrar uma gama maior de trabalhos.</li>
                <li>Newsletter Mensal: Inclusão em uma newsletter que promove produtos e serviços.</li>
                <li>Suporte Prioritário: Atendimento ao cliente com resposta mais rápida.</li>
              </ul>
              <button className="button">Escolher Plano</button>
            </div>

            {/* Plano Premium */}
            <div
              className={`plan ${selectedPlan === 'Plano Premium' ? 'selected' : ''}`}
              onClick={() => choosePlan('Plano Premium')}
            >
              <h2>Plano Premium</h2>
              <div className="price">R$ 50/mês</div>
              <ul className="listbeneficios">
                <li>Tudo do Plano Padrão: Inclui todos os benefícios do plano padrão.</li>
                <li>Perfil Destacado: Destaque na página inicial e nas seções de destaque do site.</li>
                <li>Webinar ou Workshop: Oportunidade de organizar eventos online para compartilhar conhecimento.</li>
                <li>Análise de Performance: Relatórios diários sobre o desempenho do seu perfil.</li>
                <li>Consultoria Personalizada: Sessões de consultoria para otimizar sua presença online e estratégias de marketing.</li>
              </ul>
              <button className="button">Escolher Plano</button>
            </div>
          </div>

          {showPopup && (
            <div className="popup popup-planos">
              <div className="popup-content">
                <button className="close-button" onClick={handleClosePopup}>X</button>
                <h2>Você escolheu o {selectedPlan}</h2>
                <p>Insira nome de usuario do seu perfil</p>
                <input
                  type="text"
                  placeholder="Insira seu nome de usuário"
                  value={userName}
                  onChange={handleInputChange}
                  className="user-input"
                />
                <div className="container-continuar">
                  <button className="button" onClick={handleSubmit}>Confirmar</button>
                </div>
                {message && <p className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>{message}</p>}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Assinatura;