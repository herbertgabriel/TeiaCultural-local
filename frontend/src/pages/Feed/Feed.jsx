import { useState, useEffect } from 'react';
import Publicacao from "../../components/Publicacao/Publicacao";
import Evento from "../../components/Evento/Evento";
import ButtonTransparente from "../../components/ButtonTransparente/ButtonTransparente";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Feed.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function Feed() {
  const [feedItems, setFeedItems] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const url = selectedCategory === "all"
          ? `${process.env.REACT_APP_API_BASE_URL}/feed?page=${page}`
          : selectedCategory === "eventos"
          ? `${process.env.REACT_APP_API_BASE_URL}/events?page=${page}`
          : `${process.env.REACT_APP_API_BASE_URL}/feed/filter/category/${selectedCategory}?page=${page}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = await response.json();
        setFeedItems(data.feedItems);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Erro ao buscar o feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [page, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFeedItems([]);
    setPage(0);
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-filtros">
        <ButtonTransparente title="Destaques" onClick={() => handleCategoryChange("all")} />
        <ButtonTransparente title="Literatura" onClick={() => handleCategoryChange("literatura")} />
        <ButtonTransparente title="Artesanato" onClick={() => handleCategoryChange("artesanato")} />
        <ButtonTransparente title="Moda" onClick={() => handleCategoryChange("moda")} />
        <ButtonTransparente title="Música" onClick={() => handleCategoryChange("musica")} />
        <ButtonTransparente title="Dança" onClick={() => handleCategoryChange("danca")} />
        <ButtonTransparente title="Eventos" onClick={() => handleCategoryChange("eventos")} />
      </div>
      <div className="feed-container">
        {loading ? (
          <div className="container-carregar-mais">
            <p>Carregando...</p>
          </div>
        ) : feedItems.length === 0 ? (
          <div className="container-carregar-mais">
            <p>Nenhuma publicação encontrada.</p>
          </div>
        ) : (
          feedItems.map((item) => (
            selectedCategory === "eventos" ? (
              <Evento
                key={item.eventId}
                title={item.title}
                description={item.description}
                localization={item.location}
                category={item.category}
                imageUrl={item.imageUrl}
                date={item.date}
                eventWebSiteUrl={item.eventWebSiteUrl}
              />
            ) : (
              <Publicacao
                key={item.PublicationId}
                perfilImg={item.profilePicture}
                nomeLoja={item.professionalName || item.username}
                username={item.username}
                categorias={item.category}
                imagens={[item.imageUrl1, item.imageUrl2, item.imageUrl3, item.imageUrl4]}
                content={item.content}
              />
            )
          ))
        )}
      </div>
      <div className="container-carregar-mais">
        <button onClick={handlePreviousPage} disabled={page === 0}><SlArrowLeft /></button>
        <span>Página {page + 1} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={page >= totalPages - 1}><SlArrowRight /></button>
      </div>
      <Footer />
    </>
  );
}

export default Feed;