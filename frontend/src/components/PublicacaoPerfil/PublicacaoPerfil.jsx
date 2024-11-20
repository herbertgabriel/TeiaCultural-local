import "./PublicacaoPerfil.css";

function PublicacaoPerfil({ content, imageUrl1, imageUrl2, imageUrl3, imageUrl4 }) {
  const imagens = [imageUrl1, imageUrl2, imageUrl3, imageUrl4];
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
    <article className="container-publication-profile">
      <div className={`container-imagens ${containerClass}`}>
        {validImages.map((imagem, index) => (
          <img key={index} src={imagem} alt={`Imagem ${index + 1}`} />
        ))}
      </div>
      <div className="container-content">
        <p>{content}</p>
      </div>
    </article>
  );
}

export default PublicacaoPerfil;