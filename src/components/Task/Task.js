import styles from "./Task.module.css";
const Task = ({
  active,
  close,
  deleteTask,
  setPinned,
  setUnpinned,
  completeTask,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{active.title}</div>
      <div className={styles.task}>
        <div className={styles.info}>
          <ul>
            <li>
              {active.completed === true ? (
                <span>
                  {active.completed === true && <i data-status="completed"></i>}
                  Completed
                </span>
              ) : (
                <span>Not completed</span>
              )}
            </li>
            <li>
              <span>
                {active.type === "Personal" ? (
                  <i data-status="personal"></i>
                ) : (
                  <i data-status="work"></i>
                )}
                {active.type}
              </span>
            </li>
            <li>
              {active.pinned === true ? (
                <span>
                  {active.pinned === true && <i data-status="pinned"></i>}Pinned
                </span>
              ) : (
                <span>Not pinned</span>
              )}
              {active.pinned}
            </li>
          </ul>
          <div>Date: {active.date}</div>
        </div>
        <div className={styles.description}>
          <p>{active.description}</p>
        </div>
        <div className={styles.actions}>
          {active.completed === false ? (
            <button
              className={styles.completed}
              onClick={() => completeTask(active._id)}
            >
              Complete task
            </button>
          ) : null}
          {active.pinned === false ? (
            <button
              className={styles.pinned}
              onClick={() => setPinned(active._id)}
            >
              Pin task
            </button>
          ) : (
            <button
              className={styles.pinned}
              onClick={() => setUnpinned(active._id)}
            >
              Unpin task
            </button>
          )}
          <button className={styles.delete} onClick={deleteTask}>
            Delete
          </button>
          <button className={styles.close} onClick={() => close(1)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
