// client/pages/index.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/globals.css';


const HomePage = () => {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [signupInfo, setSignupInfo] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const loginTime = parseInt(localStorage.getItem('loginTime'));
      const currentTime = Date.now();
      const elapsedTime = currentTime - loginTime;
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
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('username', loginInfo.username);
      localStorage.setItem('loginTime', Date.now().toString());
      setTimeout(() => {
        handleLogout();
      }, 10000);
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
      setSignupInfo({ username: '', password: '' });
    } catch (error) {
      setError('Signup failed: ' + (error.response?.data?.error || 'Server error'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('loginTime');
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to Memo App</h1>
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
        <ErrorMessage error={error} />
        <LoginForm loginInfo={loginInfo} setLoginInfo={setLoginInfo} handleLogin={handleLogin} />
        <SignupForm signupInfo={signupInfo} setSignupInfo={setSignupInfo} handleSignup={handleSignup} />
      </div>
    </div>
  );
};

export default HomePage;
