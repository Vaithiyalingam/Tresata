"use client";
import Image from "next/image";
import { useEdit } from "../../utils/editHooks/useEdit";
import { AddTasks } from "./AddTasks";
import EditForm from "./EditForm";
import TaskList from "./TaskLists";
import { icons } from "../../utils/icons";
import { useAdd } from "../../utils/addHooks/useAdd";

export const TasksPage = () => {
  const { handleCancel, handleSave, editTaskState, handleChange } = useEdit();
  const {
    showAddLayout,
    setShowAddLayout,
    handleCancelAdd,
    handleAddChange,
    handleAddSubmit,
    taskData,
  } = useAdd();

  const handleAddClick = () => {
    setShowAddLayout(true);
  };

  return (
    <div className="relative mx-6 h-full">
      {editTaskState.editingTaskId && (
        <div className="mt-12">
          <EditForm
            editTitle={editTaskState.editTitle}
            editDescription={editTaskState.editDescription}
            editStatus={editTaskState.editStatus}
            handleChange={handleChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        </div>
      )}
      {showAddLayout && (
        <div className="mt-5">
          <AddTasks
            handleCancelAdd={handleCancelAdd}
            handleAddChange={handleAddChange}
            handleAddSubmit={handleAddSubmit}
            taskData={taskData}
          />
        </div>
      )}

      {!showAddLayout && !editTaskState.editingTaskId && (
        <div className="pb-20 overflow-y-auto h-[calc(100vh-120px)] hide-scrollbar">
          <div className="mt-10">
            <TaskList />
          </div>
        </div>
      )}

      {!showAddLayout && !editTaskState.editingTaskId && (
        <div
          onClick={handleAddClick}
          className="absolute bottom-5 right-5 opacity-100 transition-opacity duration-300 ease-in-out cursor-pointer"
        >
          <Image
            width={50}
            height={50}
            src={icons.todoButton}
            alt="todo button"
          />
        </div>
      )}
    </div>
  );
};
