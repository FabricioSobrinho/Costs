import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { HiMenu } from "react-icons/hi";
import Container from "./Container";

import { useRef } from "react";

function NavBar() {
  const menuMobile = useRef();
  const closeMenuButton = useRef();

  const toggleMenu = () => {
    menuMobile.current.style.display === "none"
      ? (menuMobile.current.style.display = "flex")
      : (menuMobile.current.style.display = "flex");
  };
  const closeMenu = () => {
    menuMobile.current.style.display = "none";
  };
  return (
    <div className={styles.navBar}>
      <Container>
        <div className={styles.leftNav}>
          <h1>
            <Link to="/" className={styles.linkRouter}>
              Costs
            </Link>
          </h1>
        </div>

        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/" className={styles.linkRouter}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className={styles.linkRouter}>
                Projetos
              </Link>
            </li>
            <li>
              <Link to="/contato" className={styles.linkRouter}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/empresa" className={styles.linkRouter}>
                Empresa
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.openMenu} onClick={toggleMenu}>
          <HiMenu />
        </div>
        <div className={styles.navMobileMenu} ref={menuMobile}>
          <ul>
            <li>
              <Link to="/" className={styles.linkRouter}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className={styles.linkRouter}>
                Projetos
              </Link>
            </li>
            <li>
              <Link to="/contato" className={styles.linkRouter}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/empresa" className={styles.linkRouter}>
                Empresa
              </Link>
            </li>
          </ul>
          <div
            className={styles.closeMobileMenu}
            ref={closeMenuButton}
            onClick={closeMenu}
          >
            X
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NavBar;
