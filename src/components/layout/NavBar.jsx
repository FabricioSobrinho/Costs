import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

import Container from "./Container"

function NavBar() {
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
      </Container>
    </div>
  )
}

export default NavBar
