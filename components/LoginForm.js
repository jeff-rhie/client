// client/components/LoginForm.js

import React from 'react';

const LoginForm = ({ loginInfo, setLoginInfo, handleLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="text"
              value={loginInfo.username}
              onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
              placeholder="Username"
              className="w-full px-4 py-3 text-lg text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
          <div>
            <input
              type="password"
              value={loginInfo.password}
              onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
              placeholder="Password"
              className="w-full px-4 py-3 text-lg text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white transition-colors duration-200 transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
