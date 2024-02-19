import { BsFillTrashFill } from "react-icons/bs";

import styles from "../../project/project-card/ProjectCard.module.css";

function ServiceCard({ name, cost, description, handleRemove }) {
  const remove = (e) => {};

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Total Cost:</span> USD {cost}
      </p>
      <p>{description}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Delete
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
