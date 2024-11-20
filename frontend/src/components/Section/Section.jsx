import "./Section.css";

function Section({ title, content, imageSrc, isImageRight }) {
  return (
    <section className={`section ${isImageRight ? "image-right" : "image-left"}`}>
      <div className="section-image">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="section-content">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </section>
  );
}

export default Section;