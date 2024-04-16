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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newMemo}
        onChange={(e) => setNewMemo(e.target.value)}
        placeholder="Write a new memo..."
      />
      <button type="submit">Add Memo</button>
    </form>
  );
};

export default MemoForm;
