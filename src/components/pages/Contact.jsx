import styles from "./Contact.module.css"

import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa"

function Contato() {
  return (
    <div className={styles.contactContainer}>
      <h1>Como entrar em contato conosco? </h1>
      <div className={styles.cardContainer}>
        <div className={styles.cardContact}>{<FaFacebook />}</div>
        <div className={styles.cardContact}>{<FaInstagram />}</div>
        <div className={styles.cardContact}>{<FaLinkedin />}</div>
      </div>
    </div>
  )
}

export default Contato
