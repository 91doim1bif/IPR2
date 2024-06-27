import React from "react";

interface AvatarModalProps {
  avatars: string[];
  onClose: () => void;
  onSelectAvatar: (avatar: string) => void;
}

const AvatarModal: React.FC<AvatarModalProps> = ({
  avatars,
  onClose,
  onSelectAvatar,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl mb-4 text-center">Select an Avatar</h2>
        <div className="grid grid-cols-3 gap-4">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt="Avatar"
              className="cursor-pointer w-24 h-24 object-cover rounded-md hover:opacity-75"
              onClick={() => onSelectAvatar(avatar)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarModal;
//test