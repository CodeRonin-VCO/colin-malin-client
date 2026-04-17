import styles from "./buttons.module.css";

export default function Button({ children, type = "button", onClick, variant, state, disabled = false, ...props }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.btn} ${variant ? styles[variant] : ""} ${state ? styles[state] : ""}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}