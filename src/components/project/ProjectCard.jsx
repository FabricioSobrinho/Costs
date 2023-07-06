import styles from "./ProjectCard.module.css"

import { BsPencil, BsFillTrashFill } from "react-icons/bs"
import { Link } from "react-router-dom"

function ProjectCard({ id, name, budget, category, handleRemove }) {
  return (
    <div className={styles.projectCard}>
      <h4> {name}</h4>

      <p>
        <span>Orçamento: </span> R${budget}
      </p>
      <p className={styles.categoryText}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.projectCardActions}>
        <Link to="/">
          <BsPencil /> Editar
        </Link>
        <button>
          <BsFillTrashFill/> Excluir
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
