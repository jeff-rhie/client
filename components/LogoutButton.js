// client/components/LogoutButton.js

import React from 'react';

const LogoutButton = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
