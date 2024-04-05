import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.icons}>
        <a href="https://pt-br.facebook.com" className={styles.FaFacebook}>
          <FaFacebook></FaFacebook>
        </a>
        <a href="https://www.instagram.com/" className={styles.FaInstagram}>
          <FaInstagram></FaInstagram>
        </a>
        <a href="https://www.linkedin.com/" className={styles.FaLinkedin}>
          <FaLinkedin></FaLinkedin>
        </a>
      </div>
      <div className={styles.copy}>
        <p>Costs &copy; </p>
      </div>
    </div>
  );
}

export default Footer;
