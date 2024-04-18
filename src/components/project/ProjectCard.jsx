import styles from "./ProjectCard.module.css";

import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function ProjectCard({ id, name, budget, category, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  switch (category) {
    case 0:
      category = "infra";
      break;
    case 1:
      category = "desenvolvimento";
      break;
    case 2:
      category = "design";
      break;
    case 3:
      category = "planejamento";
      break;
    default:
      category = "Categoria indefinida"
      break;
  }

  return (
    <div className={styles.projectCard} key={id}>
      <h4> {name}</h4>
      <p>
        <span>Orçamento: </span> R${budget}
      </p>
      <p className={styles.categoryText}>
        <span className={`${styles[category]}`}></span> {category}
      </p>
      <div className={styles.projectCardActions}>
        <Link to={`/projects/${name}`} className={styles.actions}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove} className={styles.actions}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
