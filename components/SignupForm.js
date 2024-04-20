// client/components/SignupForm.js

import React from 'react';

const SignupForm = ({ signupInfo, setSignupInfo, handleSignup }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Your Account</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <input
              type="text"
              value={signupInfo.username}
              onChange={(e) => setSignupInfo({ ...signupInfo, username: e.target.value })}
              placeholder="Username"
              className="w-full px-4 py-3 text-lg text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:bg-white"
            />
          </div>
          <div>
            <input
              type="password"
              value={signupInfo.password}
              onChange={(e) => setSignupInfo({ ...signupInfo, password: e.target.value })}
              placeholder="Password"
              className="w-full px-4 py-3 text-lg text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white transition-colors duration-200 transform bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:bg-pink-800"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
