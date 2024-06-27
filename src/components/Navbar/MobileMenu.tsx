import React from "react";

interface MobileMenuProps {
  visible: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-full absolute top-14 left-0 py-5 flex-col border-2 border-gray-800 lg:hidden">
      <div className="flex flex-col gap-3">
        <a href="/" className="px-3 text-white text-sm hover:underline">
          Home
        </a>
        <a href="/series" className="px-3 text-white text-sm hover:underline">
          Series
        </a>
        <a href="/films" className="px-3 text-white text-sm hover:underline">
          Films
        </a>
        <a href="/new" className="px-3 text-white text-sm hover:underline">
          New & Popular
        </a>
        <a href="/my-list" className="px-3 text-white text-sm hover:underline">
          My List
        </a>
        <a
          href="/languages"
          className="px-3 text-white text-sm hover:underline"
        >
          Browse by languages
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
//test