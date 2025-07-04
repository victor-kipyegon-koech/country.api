 import React from "react";

type Props = {
  toggleDark: () => void;
};

const Header: React.FC<Props> = ({ toggleDark }) => {
  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow mb-6">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Country Finder</h1>
        <button
          onClick={toggleDark}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
        >
          Toggle Dark Mode
        </button>
      </div>
    </header>
  );
};

export default Header;
 