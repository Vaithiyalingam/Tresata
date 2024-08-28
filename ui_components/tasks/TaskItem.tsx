import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../../store/store";
import EditForm from "./EditForm";
import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskFooter from "./TaskFooter";

interface TaskItemProps {
  task: Task;
  index: number;
  editingTaskId: number | null;
  editTitle: string;
  editDescription: string;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditDescription: React.Dispatch<React.SetStateAction<string>>;
  handleSave: (id: number) => void;
  handleCancel: () => void;
  handleEdit: (task: Task) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  editingTaskId,
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
  handleSave,
  handleCancel,
  handleEdit,
  deleteTask,
}) => (
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
        className="border p-4 mb-2 rounded-md bg-[#F7F7F7]"
      >
        {editingTaskId === task.id ? (
          <EditForm
            editTitle={editTitle}
            editDescription={editDescription}
            setEditTitle={setEditTitle}
            setEditDescription={setEditDescription}
            handleSave={() => handleSave(task.id)}
            handleCancel={handleCancel}
          />
        ) : (
          <>
            <TaskHeader task={task} />
            <TaskDescription task={task} />
            <TaskFooter
              createdOn={task.createdOn}
              handleEdit={handleEdit}
              deleteTask={deleteTask}
              task={task}
            />
          </>
        )}
      </li>
    )}
  </Draggable>
);

export default TaskItem;
