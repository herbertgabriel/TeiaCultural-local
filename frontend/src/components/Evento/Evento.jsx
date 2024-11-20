import "./Evento.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function Evento({ title, description, localization, category, imageUrl, date, eventWebSiteUrl }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (eventWebSiteUrl) {
            // Adiciona "http://" ou "https://" se não estiver presente
            const url = eventWebSiteUrl.startsWith('http://') || eventWebSiteUrl.startsWith('https://')
                ? eventWebSiteUrl
                : `http://${eventWebSiteUrl}`;
            window.open(url, "_blank");
        }
    };

    return (
        <article className="container-event">
            <div className="evento-header">
                <div className="container-evento">
                    <div>
                        <h1>{title}</h1>
                        <p>{category}</p>
                    </div>
                    <div className="container-button">

                    {eventWebSiteUrl && (
                        <div className="container-button">
                            <Button onClick={handleNavigate} title="Visitar Site do Evento" />
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <div className="container-content">
                <p>{description}</p>
                <p>Localização:{localization}</p>
                <p>Data: {date}</p>
            </div>
            <div className="container-imagens">
                <img src={imageUrl} alt={title} />
            </div>
        </article>
    );
}

export default Evento;