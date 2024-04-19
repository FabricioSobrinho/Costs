import styles from "./Button.module.css";

function Button({ text, handleClick }) {
  return (
    <div className={styles.formControl}>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
}

export default Button;
