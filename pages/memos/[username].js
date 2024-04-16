import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const MemosPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState('');

  useEffect(() => {
    // Fetch existing memos on load
    const fetchMemos = async () => {
      if (username) {  // Ensure username is not undefined
        const response = await axios.get(`http://localhost:3001/memos/${username}`);
        setMemos(response.data);
      }
    };
    fetchMemos();
  }, [username]);  // Fetch memos whenever username changes

  const handleAddMemo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/memos/${username}`, { content: newMemo });
      setMemos([...memos, response.data]);
      setNewMemo('');
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
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleAddMemo}>
        <input type="text" value={newMemo} onChange={(e) => setNewMemo(e.target.value)} placeholder="Write a new memo..." />
        <button type="submit">Add Memo</button>
      </form>
      <ul>
        {memos.map(memo => (
          <li key={memo.id}>{memo.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemosPage;
