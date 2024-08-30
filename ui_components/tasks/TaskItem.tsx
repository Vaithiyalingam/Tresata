import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../../store/store";
import EditForm from "./EditForm";
import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskFooter from "./TaskFooter";

interface TaskItemProps {
  task: Task;
  index: number;
  handleEdit: (task: Task) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  handleEdit,
  deleteTask,
}) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <Draggable
      key={task.id.toString()}
      draggableId={task.id.toString()}
      index={index}
    >
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 mb-2 h-[140px] border-b border-b-[#DDDDDD]"
          onMouseEnter={() => {
            setShowEdit(true);
          }}
          onMouseLeave={() => {
            setShowEdit(false);
          }}
        >
          <>
            <div className="flex items-start gap-3 w-full">
              <div className="flex items-center justify-center w-10 h-10 border border-blue-800 text-blue-800 font-semibold rounded-full flex-shrink-0">
                {task.title.charAt(0)}
              </div>
              <div className="w-full">
                <TaskHeader task={task} />
                <TaskDescription task={task} />
                <TaskFooter
                  createdOn={task.createdOn}
                  handleEdit={handleEdit}
                  deleteTask={deleteTask}
                  task={task}
                  showEdit={showEdit}
                />
              </div>
            </div>
          </>
        </li>
      )}
    </Draggable>
  );
};

export default TaskItem;
