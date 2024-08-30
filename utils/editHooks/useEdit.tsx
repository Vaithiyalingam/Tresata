import { useAtom } from "jotai";
import {
  editTaskStateAtom,
  updateTaskAtom,
  Task,
  TaskStatus,
} from "../../store/store";

export const useEdit = () => {
  const [editTaskState, setEditTaskState] = useAtom(editTaskStateAtom);
  const [, updateTask] = useAtom(updateTaskAtom);

  const handleEdit = (task: Task) => {
    setEditTaskState({
      editingTaskId: task.id,
      editTitle: task.title,
      editDescription: task.description,
      editStatus: task.status,
    });
  };

  const handleSave = () => {
    if (editTaskState.editingTaskId !== null) {
      const updatedTask: Task = {
        id: editTaskState.editingTaskId,
        title: editTaskState.editTitle,
        description: editTaskState.editDescription,
        status: editTaskState.editStatus || TaskStatus.Pending,
        createdOn: new Date().toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
      updateTask(updatedTask);
      setEditTaskState({
        editingTaskId: null,
        editTitle: "",
        editDescription: "",
        editStatus: TaskStatus.Pending,
      });
    }
  };

  const handleCancel = () => {
    setEditTaskState({
      editingTaskId: null,
      editTitle: "",
      editDescription: "",
      editStatus: TaskStatus.Pending,
    });
  };

  const handleChange = (val: string, key: string) => {
    setEditTaskState((prevState) => {
      switch (key) {
        case "title":
          return { ...prevState, editTitle: val };
        case "description":
          return { ...prevState, editDescription: val };
        case "status":
          return { ...prevState, editStatus: val as TaskStatus };
        default:
          return prevState;
      }
    });
  };

  return { handleEdit, handleSave, handleCancel, editTaskState, handleChange };
};
