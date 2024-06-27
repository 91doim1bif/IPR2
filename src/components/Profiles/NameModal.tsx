import React, { useState } from "react";

interface NameModalProps {
  currentName: string;
  onClose: () => void;
  onSave: (name: string) => void;
}

const NameModal: React.FC<NameModalProps> = ({
  currentName,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(currentName);

  const handleSave = () => {
    onSave(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl mb-4 text-center">Change Profile Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameModal;
//test