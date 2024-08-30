import { useAtom } from "jotai";
import { useState } from "react";
import { addTaskAtom, Task, TaskStatus } from "../../store/store";

export const useAdd = () => {
  const [, addTask] = useAtom(addTaskAtom);
  const [taskData, setTaskData] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const [showAddLayout, setShowAddLayout] = useState(false);

  const handleAddChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const createdOn = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const newTask: Task = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      status: TaskStatus.Pending,
      createdOn,
    };

    addTask(newTask);

    setTaskData({ title: "", description: "" });
    setShowAddLayout(false);
  };

  const handleCancelAdd = () => {
    setTaskData({
      title: "",
      description: "",
    });
    setShowAddLayout(false);
    console.log("called cancel");
  };

  return {
    handleAddSubmit,
    handleAddChange,
    taskData,
    showAddLayout,
    setShowAddLayout,
    handleCancelAdd,
  };
};
