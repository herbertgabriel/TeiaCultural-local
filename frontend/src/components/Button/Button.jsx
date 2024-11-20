import "./button.css";

function Button({ title, onClick }) {

  return (
    <button className="button-template" onClick={onClick}>
      {title}
    </button>
  );
}


export default Button;