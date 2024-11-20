import "./Button.css";

function Button({title, onClick, style}) {

  return (
    <button className="button-transparent-template" onClick={onClick} style={style}>
      {title}
    </button>
  );
}


export default Button;