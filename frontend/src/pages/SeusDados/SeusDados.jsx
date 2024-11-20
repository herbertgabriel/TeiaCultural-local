import { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import ProfileMenu from '../../components/Profile-menu/Profile-menu';
import Footer from '../../components/Footer/Footer';
import './SeusDados.css';

function SeusDados() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('acessToken');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setFullName(data.fullName || '');
                    setUsername(data.username || '');
                    setEmail(data.email || '');
                } else {
                    console.error('Erro ao buscar perfil:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar perfil', error);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('As senhas não coincidem');
            return;
        }

        const token = localStorage.getItem('acessToken');
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        const data = {
            email,
            password
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Dados atualizados com sucesso');
                setErrorMessage(''); // Limpar mensagem de erro
                // Atualizar a interface do usuário conforme necessário
            } else {
                setErrorMessage('Erro ao atualizar dados');
                console.error('Erro ao atualizar dados:', response.statusText);
            }
        } catch (error) {
            setErrorMessage('Erro ao enviar dados');
            console.error('Erro ao enviar dados', error);
        }
    };

    const handleDeleteAccount = async () => {
        const token = localStorage.getItem('acessToken');
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log('Conta deletada com sucesso');
                localStorage.removeItem('acessToken');
                navigate('/');
            } else {
                console.error('Erro ao deletar conta:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao deletar conta', error);
        }
    };

    return (
        <>
            <Navbar />
            <ProfileMenu />
            <div id='geraldo'>
                <form onSubmit={handleSubmit} className='geral'>
                    <div className="section1">
                        <p className='laranja'>Nome Completo</p>
                        <input
                            className='input'
                            type="text"
                            value={fullName}
                            readOnly
                        />
                    </div>
                    <div className="section1">
                        <p className='laranja'>Nome de Usuário <FaPen className='lapis' /></p>
                        <input
                            className='input'
                            type="text"
                            placeholder='Insira seu nome de usuário...'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="section1">
                        <p className='laranja'>Email <FaPen className='lapis' /></p>
                        <input
                            className='input'
                            type='email'
                            placeholder='Digite seu email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="section1">
                        <p className='laranja'>Senha <FaPen className='lapis' /></p>
                        <input
                            className='input'
                            type='password'
                            placeholder='Digite sua nova senha...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="section1">
                        <p className='laranja'>Confirmar Senha</p>
                        <input
                            className='input'
                            type='password'
                            placeholder='Confirme sua nova senha...'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="button-template" style={{ width: '100%' }}>Salvar</button>
                </form>

                <div className='geral'>
                    <div className="section1">
                        <p className='laranja'>Conta</p>
                        <a href="#">Suas sessões ativas</a>
                        <a href="#">Verificação em duas etapas</a>
                        <a href="#" className="delete" onClick={() => setShowDeletePopup(true)}>Deletar conta</a>
                    </div>
                    <div className="section2">
                        <p className='laranja'>Assinatura e Pagamentos</p>
                        <a href="#">Divulgue seus serviços</a>
                        <a href="#">Visualizar histórico de pagamentos</a>
                    </div>
                    <div className="section2">
                        <p className='laranja'>Privacidade</p>
                        <a href="#">Quem pode ver seus recomendados</a>
                        <a href="#">Quem pode ver suas comunidades</a>
                    </div>
                </div>
            </div>
            {showDeletePopup && (
                <div className = "container-delete-popup">
                    <div className="popup">
                        <div className="popup-content" style={{ height: '23%' , width: '15%'}}>
                            <h2>Tem certeza que deseja deletar sua conta?</h2>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={confirmDelete}
                                    onChange={(e) => setConfirmDelete(e.target.checked)}
                                />
                                Eu tenho certeza
                            </label>
                            <button
                                className="button-template"
                                onClick={handleDeleteAccount}
                                disabled={!confirmDelete}
                            >
                                Confirmar
                            </button>
                            <button
                                className="button-template"
                                onClick={() => setShowDeletePopup(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default SeusDados;