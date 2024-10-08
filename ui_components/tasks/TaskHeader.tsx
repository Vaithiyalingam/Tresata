import React from "react";
import { Task, TaskStatus } from "../../store/store";

interface TaskHeaderProps {
  task: Task;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ task }) => {
  const getStatusStyles = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.Pending:
        return "bg-[#D0D0D0] text-white border-[#D0D0D0]";
      case TaskStatus.Completed:
        return "bg-green-500 text-white border-green-600";
      case TaskStatus.InProgress:
        return "bg-[#FFB03C] text-white border-[#FFB03C]";
      default:
        return "bg-gray-400 text-gray-800 border-gray-600";
    }
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 w-full max-w-[150px]">
        <h3
          className={`text-[#034EA2] text-[14px] font-semibold truncate overflow-hidden whitespace-nowrap ${
            task.status === TaskStatus.Completed
              ? "line-through text-gray-500"
              : ""
          }`}
        >
          {task.title}
        </h3>
      </div>
      <div className="flex items-center mb-2">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${getStatusStyles(
            task.status
          )}`}
        ></div>
        <p className="text-sm text-gray-600">{task.status}</p>
      </div>
    </div>
  );
};

export default TaskHeader;
