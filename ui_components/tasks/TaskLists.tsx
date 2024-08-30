"use client";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { tasksAtom, deleteTaskAtom, Task, TaskStatus } from "../../store/store";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";
import Accordion from "../Accordian";
import { useEdit } from "../../utils/editHooks/useEdit";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [, deleteTask] = useAtom(deleteTaskAtom);

  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const { handleEdit } = useEdit();

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedTasks: Record<TaskStatus, Task[]> = {
    [TaskStatus.Pending]: filteredTasks.filter(
      (task) => task.status === TaskStatus.Pending
    ),
    [TaskStatus.InProgress]: filteredTasks.filter(
      (task) => task.status === TaskStatus.InProgress
    ),
    [TaskStatus.Completed]: filteredTasks.filter(
      (task) => task.status === TaskStatus.Completed
    ),
  };

  const handleOnDragStart = (result: any) => {
    const { source } = result;
    console.log(source, "source");
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

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setOpenAccordion(true);
    }
  }, [searchQuery]);

  useEffect(() => {
    setOpenAccordion(true);
  }, [tasks]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      <DragDropContext
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
      >
        {Object.keys(groupedTasks).map((status) => {
          const typedStatus = status as TaskStatus;
          const tasksForStatus = groupedTasks[typedStatus];
          return (
            <div
              key={status}
              onDragStart={() => {
                setOpenAccordion(true);
              }}
              onDragEnd={() => {
                setOpenAccordion(false);
              }}
            >
              <Accordion
                key={status}
                title={status}
                isOpen={openAccordion}
                itemCount={tasksForStatus.length}
              >
                <Droppable droppableId={status} direction="vertical">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="rounded-md flex flex-col"
                    >
                      <ul className="">
                        {tasksForStatus.length > 0 ? (
                          tasksForStatus.map((task, index) => (
                            <TaskItem
                              key={task.id}
                              task={task}
                              index={index}
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
                  )}
                </Droppable>
              </Accordion>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default TaskList;
