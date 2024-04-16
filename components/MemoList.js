// client/components/MemoList.js

import React from 'react';

const MemoList = ({ memos }) => {
  return (
    <ul>
      {memos.map(memo => (
        <li key={memo.id}>{memo.content}</li>
      ))}
    </ul>
  );
};

export default MemoList;
