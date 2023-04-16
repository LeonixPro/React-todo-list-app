import styles from "./Main.module.css";
const Active = ({ cancel }) => {
  return (
    <div className={styles.active}>
      <button className={styles.completed}>Mark as completed</button>
      <button className={styles.pinTask}>Pin Task</button>
      <button className={styles.delete}>Delete Task</button>
      <button id="cancel" className={styles.cancel} onClick={cancel}>
        Cancel
      </button>
    </div>
  );
};

export default Active;
