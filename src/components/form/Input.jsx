import styles from "./Input.module.css";
function Input({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}

export default Input;
