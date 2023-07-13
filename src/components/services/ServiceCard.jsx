import styles from "../project/ProjectCard.module.css"
import { BsTrashFill } from "react-icons/bs"

function ServiceCard({ id, handleRemove, key, cost, description, name }) {
  const remove = () => {}

  return (
      <div className={styles.projectCard}>
        <h4>{name}</h4>
        <p>
          <span>Custo total: </span> R${cost}
        </p>
        <p>{description}</p>
        <div className={styles.projectCardActions}>
          <button onClick={remove}>
            <BsTrashFill />
            Excluir serviço
          </button>
        </div>
      </div>
  )
}

export default ServiceCard
