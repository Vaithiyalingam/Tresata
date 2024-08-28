import Image from "next/image";
import React from "react";
import { icons } from "../../utils/icons";
import { Task } from "../../store/store";

interface TaskFooterProps {
  createdOn: string;
  task: Task;
  handleEdit: (task: Task) => void;
  deleteTask: (id: number) => void;
}

const TaskFooter: React.FC<TaskFooterProps> = ({
  createdOn,
  task,
  handleEdit,
  deleteTask,
}) => (
  <div className="flex items-center justify-between">
    <p className="text-[#767676] text-xs font-normal">{createdOn}</p>
    <div>
      <button
        onClick={() => {
          handleEdit(task);
        }}
      >
        <Image src={icons.pencilIcon} alt="Edit" />
      </button>
      <button
        onClick={() => {
          deleteTask(task.id);
        }}
      >
        <Image src={icons.trashIcon} alt="Delete" />
      </button>
    </div>
  </div>
);

export default TaskFooter;
