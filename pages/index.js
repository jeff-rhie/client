// client/pages/index.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import ErrorMessage from '../components/ErrorMessage';

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
      <ErrorMessage error={error} />
      <LoginForm loginInfo={loginInfo} setLoginInfo={setLoginInfo} handleLogin={handleLogin} />
      <SignupForm signupInfo={signupInfo} setSignupInfo={setSignupInfo} handleSignup={handleSignup} />
    </div>
  );
};

export default HomePage;
