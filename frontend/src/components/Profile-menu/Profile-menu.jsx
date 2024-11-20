import { useNavigate, useLocation } from 'react-router-dom';
import ButtonTransparent from "../ButtonTransparente/ButtonTransparente";
import './Profile-menu.css';

function ProfileMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('acessToken');
        localStorage.removeItem('expiresIn');
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <div className='profile-menu'>
            <ButtonTransparent 
                title="Seus Dados" 
                onClick={() => navigate('/seus-dados')} 
                style={{ color: isActive('/seus-dados') ? 'white' : 'gray' }} 
            />
            <ButtonTransparent 
                title="Perfil Profissional" 
                onClick={() => navigate('/perfil-profissional')}
                style={{ color: isActive('/perfil-profissional') ? 'white' : 'gray' }} 
            />
            <ButtonTransparent 
                title="Editar Publicações" 
                onClick={() => navigate('/editar-publicacoes')}
                style={{ color: isActive('/editar-publicacoes') ? 'white' : 'gray' }} 
            />
            <ButtonTransparent 
                title="Sair da Conta" 
                onClick={handleLogout}
                style={{ color: 'gray' }} 
            />
        </div>
    );
}

export default ProfileMenu;