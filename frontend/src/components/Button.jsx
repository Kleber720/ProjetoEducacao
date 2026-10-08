import "./Button.css";
function Button({ text, icon, onClick, className, type = 'button' }) {
    return (
        <button 
        type={type} 
        className={["appButton", className].filter(Boolean).join(" ")} 
        onClick={onClick}>
            {icon}
            {text}
        </button>
    );
}
export default Button;
