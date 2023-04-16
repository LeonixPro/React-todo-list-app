import { useForm } from "react-hook-form";
import styles from "./AddTask.module.css";
const AddTask = ({ addTask, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _id: Date.now(),
      title: "",
      description: "",
      type: "Personal",
      pinned: false,
      completed: false,
      date: Date().slice(0, 21),
    },
    mode: "onBlur",
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <button className={styles.close} onClick={close}>
          X
        </button>
        <h4>Add new task</h4>
        <form onSubmit={handleSubmit(addTask)}>
          <input
            type="text"
            {...register("title", {
              required: "Title can not be empty",
              maxLength: {
                value: 50,
                message: "Max length is 50",
              },
              minLength: {
                value: 6,
                message: "Min length is 6",
              },
            })}
            placeholder="Add Task Title"
          />
          <select
            defaultValue="Personal"
            {...register("type", {
              required: "Please, choose the type",
            })}
          >
            <option value="Personal">Personal</option>
            <option value="Work related">Work related</option>
          </select>
          <textarea
            {...register("description", {
              required: "Description can not be empty",
              maxLength: {
                value: 300,
                message: "Max length is 300",
              },
              minLength: {
                value: 6,
                message: "Min length is 6",
              },
            })}
            placeholder="Add Description..."
          ></textarea>
          <button>Add task</button>
        </form>
        {errors?.title?.message && (
          <div className={styles.error}>{errors?.title?.message}</div>
        )}
        {errors?.type?.message && (
          <div className={styles.error}>{errors?.type?.message}</div>
        )}
        {errors?.description?.message && (
          <div className={styles.error}>{errors?.description?.message}</div>
        )}
      </div>
    </div>
  );
};

export default AddTask;
