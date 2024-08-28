"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { addTaskAtom, Task, TaskStatus } from "../../store/store";

export const AddTasks = () => {
  const [, addTask] = useAtom(addTaskAtom);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const createdOn = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: TaskStatus.Pending,
      createdOn,
    };

    addTask(newTask);

    setTitle("");
    setDescription("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center gap-5">
        <div>
          <input
            className="border border-[#DDDDDD] p-2 rounded-md w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            required
          />
          <textarea
            className="border border-[#DDDDDD] p-2 rounded-md w-full mt-5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the description"
            rows={3}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex self-end justify-center px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm"
        >
          Add Task
        </button>
      </form>
    </>
  );
};
