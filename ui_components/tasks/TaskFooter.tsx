import Image from "next/image";
import React from "react";
import { icons } from "../../utils/icons";
import { Task } from "../../store/store";

interface TaskFooterProps {
  createdOn: string;
  task: Task;
  handleEdit: (task: Task) => void;
  deleteTask: (id: number) => void;
  showEdit: boolean;
}

const TaskFooter: React.FC<TaskFooterProps> = ({
  createdOn,
  task,
  handleEdit,
  deleteTask,
  showEdit,
}) => (
  <div className="flex items-center justify-between">
    <p className="text-[#767676] text-xs font-normal">{createdOn}</p>
    <div
      className={`hidden lg:flex space-x-2 transition-opacity duration-300 ease-in-out ${
        showEdit ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button onClick={() => handleEdit(task)} className="p-1">
        <Image src={icons.pencilIcon} alt="Edit" />
      </button>
      <button onClick={() => deleteTask(task.id)} className="p-1">
        <Image src={icons.trashIcon} alt="Delete" />
      </button>
    </div>
    <div className="flex lg:hidden">
      <button onClick={() => handleEdit(task)} className="p-1">
        <Image src={icons.pencilIcon} alt="Edit" />
      </button>
      <button onClick={() => deleteTask(task.id)} className="p-1">
        <Image src={icons.trashIcon} alt="Delete" />
      </button>
    </div>
  </div>
);

export default TaskFooter;
