import "./Publicacao.css";
import FotoPerfil from "../FotoPerfil/FotoPerfil";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function Publicacao({ perfilImg, nomeLoja, username, categorias, content, imagens }) {
    const navigate = useNavigate();
    const validImages = imagens.filter(imagem => imagem !== null);
    const imageCount = validImages.length;
    let containerClass = "";

    if (imageCount === 1) {
        containerClass = "one";
    } else if (imageCount === 2) {
        containerClass = "two";
    } else if (imageCount === 3) {
        containerClass = "three";
    } else if (imageCount >= 4) {
        containerClass = "four";
    }

    return (
        <article className="container-publication">
            <div className="publicacao-header">
                <div className="container-perfil">
                    <FotoPerfil src={perfilImg} isLarge={false} />
                    <div>
                        <h1>{nomeLoja}</h1>
                        <p>{categorias}</p>
                    </div>
                   

                </div>
                <Button title={"Ver perfil"} onClick={() => navigate(`/profile/username/${username}`)} />
            </div>
            <div className="container-content"><p>{content}</p></div>
            <div className={`container-imagens ${containerClass}`}>
                {validImages.map((imagem, index) => (
                    <img key={index} src={imagem} alt={`Imagem ${index + 1}`} />
                ))}
            </div>
        </article>
    );
}

export default Publicacao;