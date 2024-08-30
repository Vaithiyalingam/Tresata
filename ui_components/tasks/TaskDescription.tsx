import React from "react";
import { Task, TaskStatus } from "../../store/store";

interface TaskDescriptionProps {
  task: Task;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({ task }) => (
  <div className="custom-scrollbar h-12 overflow-y-auto mb-2">
    <p
      className={`whitespace-normal break-words text-[#231F20] text-[12px] font-normal ${
        task.status === TaskStatus.Completed ? "line-through text-gray-500" : ""
      }`}
    >
      {task.description}
    </p>
  </div>
);

export default TaskDescription;
