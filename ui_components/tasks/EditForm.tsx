import React from "react";

interface EditFormProps {
  editTitle: string;
  editDescription: string;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditDescription: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
  handleCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
  handleSave,
  handleCancel,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Enter new title"
        className="border p-2 rounded-md w-full"
        required
      />
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        placeholder="Enter new description"
        rows={3}
        className="border p-2 rounded-md w-full"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
