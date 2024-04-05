import styles from "./Loader.module.css";
import imgLoader from "../../assets/images/loading.svg";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <img src={imgLoader} alt="Loading" className={styles.loaderImg} />
    </div>
  );
}

export default Loader;
