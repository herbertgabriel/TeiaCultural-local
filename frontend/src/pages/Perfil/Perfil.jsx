import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FotoPerfil from "../../components/FotoPerfil/FotoPerfil";
import PublicacaoPerfil from "../../components/PublicacaoPerfil/PublicacaoPerfil";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Perfil.css";

function Perfil() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [publications, setPublications] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profile/username/${username}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          setErrorMessage('Erro ao carregar os dados do perfil.');
        }
      } catch (error) {
        setErrorMessage('Erro ao carregar os dados do perfil.');
      }
    };

    const fetchPublications = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profile/publications/${username}`);
        if (response.ok) {
          const data = await response.json();
          setPublications(data);
        } else {
          setErrorMessage('Erro ao carregar as publicações.');
        }
      } catch (error) {
        setErrorMessage('Erro ao carregar as publicações.');
      }
    };

    fetchProfileData();
    fetchPublications();
  }, [username]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!profileData) {
    return <div>Carregando...</div>;
  }

  // Filtrar publicações para a galeria
  const galleryImages = publications
    .flatMap(publication => [
      publication.imageUrl1,
      publication.imageUrl2,
      publication.imageUrl3,
      publication.imageUrl4
    ])
    .filter(Boolean); // Filtra URLs não nulas

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <Navbar />
      <main className='profile-main'>
        <div className="container-photo">
          <FotoPerfil src={profileData.ProfilePicture} isLarge={true} />
          <h1>{profileData.professionalName}</h1>
          <h2>{profileData.category}</h2>
        </div>
        <div className="sobre-mim">
          <h1>Sobre</h1>
          <p>{profileData.aboutMe}</p>
        </div>
        <div>
          <h1>Publicações</h1>
          <div className="container-publicacoes">
            {publications.map((publication) => (
              <PublicacaoPerfil
                key={publication.id}
                content={publication.content}
                imageUrl1={publication.imageUrl1}
                imageUrl2={publication.imageUrl2}
                imageUrl3={publication.imageUrl3}
                imageUrl4={publication.imageUrl4}
              />
            ))}
          </div>
        </div>
        {galleryImages.length > 0 && (
          <div>
            <h1>Galeria</h1>
            <Slider {...settings} className={`container-galeria ${galleryImages.length === 1 ? 'hidden' : ''}`}>
              {galleryImages.map((imagem, index) => (
                <div key={index}>
                  <img src={imagem} alt={`Galeria ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
        )}
        <div className="cantato-local">
          <div>
            <h1>Contato</h1>
            <p>Email: {profileData.email}</p>
            <p>Telefone: {profileData.telephone}</p>
            <p>Redes Sociais: {profileData.socialMedia}</p>
          </div>
          <div>
            <h1>Localização</h1>
            <p>{profileData.localization}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Perfil;