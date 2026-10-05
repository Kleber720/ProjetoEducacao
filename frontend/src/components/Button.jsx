import "./Button.css";
function Button({ text, icon, onClick, className, type = 'button' }) {
    return (
        <button 
        type={type} 
        className={className} 
        onClick={onClick}>
            {icon}
            {text}
        </button>
    );
}
export default Button;
