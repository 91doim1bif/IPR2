import React from "react";
import { useAuth } from "../Authentifcation/AuthProvider";
import { useNavigate } from "react-router-dom";

interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!visible) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/auth"); // Redirect to login page after logout
  };

  const handleSwitchProfiles = () => {
    navigate("/profiles"); // Redirect to profiles management page
  };

  const handleSettings = () => {
    navigate("/settings"); // Redirect to profiles management page
  };

  return (
    <div className="bg-black w-48 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-3">
        <div className="px-3 py-2 border-b border-gray-700">
          <span className="text-white text-sm">{user?.name}</span>
        </div>
        <button
          onClick={handleSwitchProfiles}
          className="px-3 py-2 text-left text-white text-sm hover:underline"
        >
          Switch Profiles
        </button>
        <button
          onClick={handleSettings}
          className="px-3 py-2 text-left text-white text-sm hover:underline"
        >
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-left text-white text-sm hover:underline"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
//test