import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

function NavBar() {
  return (
    <div className={styles.navBar}>

        <div className={styles.leftNav}>
            <h1><Link to="/" className={styles.linkRouter}>Costs</Link></h1>
        </div>

        <nav className={styles.nav}>
           <ul>
        <li>
          <Link to="/" className={styles.linkRouter}>Home</Link>
        </li>
        <li>
          <Link to="/company" className={styles.linkRouter}>company</Link>
        </li>
        <li>
          <Link to="/contato" className={styles.linkRouter}>Contact</Link>
        </li>
        <li>
          <Link to="/newproject" className={styles.linkRouter}>Novo projeto</Link>
        </li>
      </ul>    
        </nav>
   
    </div>
  )
}

export default NavBar
