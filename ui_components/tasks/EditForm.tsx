import React from "react";
import { TaskStatus } from "../../store/store";
import CustomDropdown from "../CustomDropDown";

interface EditFormProps {
  editTitle: string;
  editDescription: string;
  editStatus: TaskStatus;
  handleChange: (val: string, key: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({
  editTitle,
  editDescription,
  editStatus,
  handleChange,
  handleSave,
  handleCancel,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSave();
  };

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

  const options = Object.values(TaskStatus).map((status) => ({
    value: status,
    label: (
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${getStatusStyles(status)}`}
        ></div>
        <p className="text-sm text-gray-600">{status}</p>
      </div>
    ),
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={editTitle}
        onChange={(e) => handleChange(e.target.value, "title")}
        placeholder="Enter new title"
        className="border border-[#DDDDDD] p-2 rounded-md w-full"
        required
      />
      <textarea
        value={editDescription}
        onChange={(e) => handleChange(e.target.value, "description")}
        placeholder="Enter new description"
        rows={3}
        className="border border-[#DDDDDD] p-2 rounded-md w-full custom-scrollbar"
        required
      />
      <CustomDropdown
        options={options}
        value={editStatus}
        onChange={(val) => handleChange(val, "status")}
      />
      <div className="flex gap-2 justify-between mt-9">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-[#034EA2] text-[#034EA2] rounded-md w-[110px]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#034EA2] text-white rounded-md w-[110px]"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditForm;
