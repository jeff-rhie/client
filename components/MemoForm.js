// client/components/MemoForm.js

import React, { useState } from 'react';

const MemoForm = ({ onSubmit }) => {
  const [newMemo, setNewMemo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newMemo);
    setNewMemo('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <input
        type="text"
        value={newMemo}
        onChange={(e) => setNewMemo(e.target.value)}
        placeholder="Write a new memo..."
        className="flex-1 px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 shadow"
      >
        Add Memo
      </button>
    </form>
  );
};

export default MemoForm;
