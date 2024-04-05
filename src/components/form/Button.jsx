import styles from "./Button.module.css";

function Button({ text }) {
  return (
    <div className={styles.formControl}>
      <button>{text}</button>
    </div>
  );
}

export default Button;
