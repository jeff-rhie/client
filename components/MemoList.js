// client/components/MemoList.js

import React from 'react';

const MemoList = ({ memos }) => {
  return (
    <ul className="divide-y divide-gray-200 h-96 overflow-auto">
      {memos.map(memo => (
        <li key={memo.id} className="px-4 py-2 hover:bg-gray-50">
          {memo.content}
        </li>
      ))}
    </ul>
  );
};

export default MemoList;
