// client/pages/[username].js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import MemoList from '../../components/MemoList';
import MemoForm from '../../components/MemoForm';
import LogoutButton from '../../components/LogoutButton';

const MemosPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const fetchMemos = async () => {
      if (username) {
        try {
          const response = await axios.get(`http://localhost:3001/memos/${username}`);
          setMemos(response.data);
        } catch (error) {
          console.error('Error fetching memos:', error.response?.data || 'Server error');
        }
      }
    };
    fetchMemos();
  }, [username]);

  const handleAddMemo = async (content) => {
    try {
      const response = await axios.post(`http://localhost:3001/memos/${username}`, { content });
      setMemos([...memos, response.data]);
    } catch (error) {
      console.error('Error adding memo:', error.response?.data || 'Server error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    router.push('/'); // Redirect to login page after logout
  };

  return (
    <div>
      <h1>Memos for {username}</h1>
      <LogoutButton onLogout={handleLogout} />
      <MemoForm onSubmit={handleAddMemo} />
      <MemoList memos={memos} />
    </div>
  );
};

export default MemosPage;
