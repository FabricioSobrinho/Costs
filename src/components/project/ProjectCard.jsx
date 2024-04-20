import styles from "./ProjectCard.module.css";

import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProjectCard({ id, name, budget, category, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(name);
  };

  switch (category) {
    case 1:
      category = "infra";
      break;
    case 2:
      category = "desenvolvimento";
      break;
    case 3:
      category = "design";
      break;
    case 4:
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
