import React, { FC } from "react";

export interface IAddTasks {
  handleCancelAdd: () => void;
  handleAddChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleAddSubmit: (e: React.FormEvent) => void;
  taskData: { title: string; description: string };
}

export const AddTasks: FC<IAddTasks> = ({
  handleCancelAdd,
  handleAddChange,
  handleAddSubmit,
  taskData,
}) => {
  return (
    <form onSubmit={handleAddSubmit} className="">
      <div>
        <input
          name="title"
          className="border border-[#DDDDDD] p-2 rounded-md w-full"
          value={taskData.title}
          onChange={handleAddChange}
          placeholder="Enter the title"
          required
        />
        <textarea
          name="description"
          className="border border-[#DDDDDD] p-2 rounded-md w-full mt-5"
          value={taskData.description}
          onChange={handleAddChange}
          placeholder="Enter the description"
          rows={3}
          required
        ></textarea>
      </div>

      <div className="flex gap-2 justify-between mt-9">
        <button
          type="button"
          onClick={() => {
            handleCancelAdd();
          }}
          className="px-4 py-2 border border-[#034EA2] text-[#034EA2] rounded-md w-[110px]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#034EA2] text-white rounded-md w-[110px]"
        >
          Add
        </button>
      </div>
    </form>
  );
};
