import styles from "./Contact.module.css";

import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

function Contato() {
  return (
    <div className={styles.contactContainer}>
      <h1>Como entrar em contato conosco? </h1>
      <div className={styles.cardContainer}>
        <div className={styles.cardContact}>
          <FaFacebook fill="#1010ff" />
        </div>
        <div className={styles.cardContact}>
          <FaInstagram fill="#c0148f" />
        </div>
        <div className={styles.cardContact}>
          <FaLinkedin fill="#202093" />
        </div>
      </div>
    </div>
  );
}

export default Contato;
