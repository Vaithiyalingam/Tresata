"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  tasksAtom,
  deleteTaskAtom,
  updateTaskAtom,
  Task,
  TaskStatus,
} from "../../store/store";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [, deleteTask] = useAtom(deleteTaskAtom);
  const [, updateTask] = useAtom(updateTaskAtom);

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSave = (id: number) => {
    const updatedTask: Task = {
      ...tasks.find((task) => task.id === id)!,
      title: editTitle,
      description: editDescription,
    };
    updateTask(updatedTask);
    setEditingTaskId(null);
  };

  const handleCancel = () => {
    setEditingTaskId(null);
  };

  const groupedTasks: Record<TaskStatus, Task[]> = {
    [TaskStatus.Pending]: tasks.filter(
      (task) => task.status === TaskStatus.Pending
    ),
    [TaskStatus.InProgress]: tasks.filter(
      (task) => task.status === TaskStatus.InProgress
    ),
    [TaskStatus.Completed]: tasks.filter(
      (task) => task.status === TaskStatus.Completed
    ),
  };

  const handleOnDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const taskId = parseInt(draggableId);
    const movedTask = tasks.find((task) => task.id === taskId)!;

    let updatedTasks = [...tasks];

    if (destination.droppableId === source.droppableId) {
      const currentTasks = groupedTasks[source.droppableId as TaskStatus];

      currentTasks.splice(source.index, 1);
      currentTasks.splice(destination.index, 0, movedTask);

      updatedTasks = tasks.map((task) =>
        task.status === source.droppableId
          ? currentTasks.find((t) => t.id === task.id) || task
          : task
      );
    } else {
      updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: destination.droppableId as TaskStatus }
          : task
      );
    }

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {Object.keys(groupedTasks).map((status) => {
          const typedStatus = status as TaskStatus;
          const tasksForStatus = groupedTasks[typedStatus];
          return (
            <Droppable key={status} droppableId={status} direction="vertical">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded-md flex flex-col h-[90vh]"
                >
                  <div className="sticky top-0 bg-gray-100 p-4 shadow-md z-10">
                    <h2 className="text-lg font-semibold mb-2 capitalize">
                      {status}
                    </h2>
                  </div>
                  <div className="flex-1 overflow-auto custom-scrollbar">
                    <ul className="p-4">
                      {tasksForStatus.length > 0 ? (
                        tasksForStatus.map((task, index) => (
                          <TaskItem
                            key={task.id}
                            task={task}
                            index={index}
                            editingTaskId={editingTaskId}
                            editTitle={editTitle}
                            editDescription={editDescription}
                            setEditTitle={setEditTitle}
                            setEditDescription={setEditDescription}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            handleEdit={handleEdit}
                            deleteTask={deleteTask}
                          />
                        ))
                      ) : (
                        <li className="text-gray-500 text-center py-10">
                          No Items Found
                        </li>
                      )}
                      {provided.placeholder}
                    </ul>
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default TaskList;
