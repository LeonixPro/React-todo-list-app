import { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";

const Main = () => {
  const [active, setActive] = useState([]);
  const [current, setCurrent] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [newTask, setNewTask] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  useEffect(() => {
    setTasksList(tasks);
  }, []);
  const activeTask = (id) => {
    setCurrent(true);
    setActive(tasks[id]);
    setCurrentId(id);
  };

  const close = (id) => {
    if (id === 1) {
      setCurrent(!current);
    } else {
      setNewTask(!newTask);
    }
  };

  const addNewTask = () => {
    setNewTask(true);
  };

  const addTask = (data) => {
    let tasksList = [];
    if ("tasks" in localStorage) {
      tasksList = JSON.parse(localStorage.getItem("tasks"));
      tasksList.push(data);
      localStorage.setItem("tasks", JSON.stringify(tasksList));
      setTasksList(tasksList);
      setNewTask(!newTask);
    } else {
      tasksList.push(data);
      localStorage.setItem("tasks", JSON.stringify(tasksList));
      setTasksList(tasksList);
      setNewTask(!newTask);
    }
  };

  const deleteTask = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(currentId, 1);
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setCurrent(!current);
      setTasksList(tasks);
    } else {
      localStorage.clear();
      setCurrent(!current);
      setTasksList(tasks);
    }
  };

  const setPinned = (id) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const changed = tasks.map((task) =>
      task._id === id ? { ...task, pinned: true } : task
    );
    localStorage.setItem("tasks", JSON.stringify(changed));
    setTasksList(changed);
    setActive(changed[currentId]);
  };

  const setUnpinned = (id) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const changed = tasks.map((task) =>
      task._id === id ? { ...task, pinned: false } : task
    );
    localStorage.setItem("tasks", JSON.stringify(changed));
    setTasksList(changed);
    setActive(changed[currentId]);
  };

  const completeTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const changed = tasks.map((task) =>
      task._id === id ? { ...task, completed: true } : task
    );
    localStorage.setItem("tasks", JSON.stringify(changed));
    setTasksList(changed);
    setActive(changed[currentId]);
  };

  return (
    <div
      className={
        current === true
          ? `${styles.wrapper} ${styles.activeTask}`
          : styles.wrapper
      }
    >
      <button className={styles.newTask} onClick={addNewTask}>
        <i className="bi bi-pencil-square"></i> <span>Add New Task</span>
      </button>
      <div className={styles.mainWrapper}>
        <div className={styles.top}>
          <h4>Tasks</h4>
          <div className={styles.topInfo}>
            You have total {tasksList?.length} tasks
          </div>
        </div>
        <div className={styles.container}>
          {tasksList && tasksList.length > 0 ? (
            tasksList.map((task, index) => (
              <div
                className={
                  task.completed === false
                    ? styles.task
                    : `${styles.task} ${styles.completedTask}`
                }
                key={task._id}
                onClick={() => activeTask(index)}
              >
                {task.pinned === true ? (
                  <div className={styles.pinned}>Pinned</div>
                ) : null}
                <div className={styles.title}>
                  {task.title.length > 20
                    ? `${task.title.slice(0, 20)}...`
                    : task.title}
                </div>
                <p>
                  {task.description.length > 70
                    ? `${task.description.slice(0, 70)}...`
                    : task.description}
                </p>
                <div className={styles.type}>
                  {task.type === "Personal" ? (
                    <i className={styles.personal}></i>
                  ) : (
                    <i className={styles.work}></i>
                  )}
                  {task.type}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noTask}>The are no tasks yet</div>
          )}
        </div>
      </div>
      {current && (
        <Task
          active={active}
          close={close}
          deleteTask={deleteTask}
          setPinned={setPinned}
          setUnpinned={setUnpinned}
          completeTask={completeTask}
        />
      )}
      {newTask && <AddTask addTask={addTask} close={close} />}
    </div>
  );
};

export default Main;
