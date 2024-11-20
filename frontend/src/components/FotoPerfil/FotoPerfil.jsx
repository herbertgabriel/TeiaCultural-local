import './FotoPerfil.css';

const FotoPerfil = ({ src, isLarge }) => {
    const defaultSrc = 'src/assets/foto-perfil.svg';
    return (
        <img
            src={src || defaultSrc}
            alt="Foto de Perfil"
            className={`foto-perfil ${isLarge ? 'large' : 'small'}`}
        />
    );
};

export default FotoPerfil;