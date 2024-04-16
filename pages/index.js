import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [signupInfo, setSignupInfo] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for an existing access token in localStorage
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Get the login time from localStorage
      const loginTime = parseInt(localStorage.getItem('loginTime'));
      // Calculate the elapsed time since login
      const currentTime = Date.now();
      const elapsedTime = currentTime - loginTime;
      // Redirect to user's memo page only if the elapsed time is less than 10 seconds
      if (elapsedTime < 10000) {
        window.location.href = `/memos/${localStorage.getItem('username')}`;
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/login', loginInfo, { withCredentials: true });
      console.log('Logged in:', response.data);
      // Store access token and username in localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('username', loginInfo.username);
      // Store login time in localStorage
      localStorage.setItem('loginTime', Date.now().toString());
      // Set timeout for auto-logout after 10 seconds (for testing)
      setTimeout(() => {
        handleLogout();
      }, 10000); // 10 seconds (for testing)
      // Redirect to user's memo page
      window.location.href = `/memos/${loginInfo.username}`;
    } catch (error) {
      setError('Login failed: ' + (error.response?.data?.error || 'Server error'));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/signup', signupInfo);
      console.log('Signed up:', response.data);
      setSignupInfo({ username: '', password: '' }); // Clear signup form
    } catch (error) {
      setError('Signup failed: ' + (error.response?.data?.error || 'Server error'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('loginTime'); // Remove login time from localStorage
    window.location.href = '/'; // Redirect to home page after logout
  };

  return (
    <div>
      <h1>Welcome to Memo App</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" value={loginInfo.username} onChange={(e) => setLoginInfo({...loginInfo, username: e.target.value})} placeholder="Username" />
          <input type="password" value={loginInfo.password} onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value})} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input type="text" value={signupInfo.username} onChange={(e) => setSignupInfo({...signupInfo, username: e.target.value})} placeholder="Username" />
          <input type="password" value={signupInfo.password} onChange={(e) => setSignupInfo({...signupInfo, password: e.target.value})} placeholder="Password" />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
