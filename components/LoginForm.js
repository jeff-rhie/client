// client/components/LoginForm.js

import React from 'react';

const LoginForm = ({ loginInfo, setLoginInfo, handleLogin }) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={loginInfo.username}
          onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={loginInfo.password}
          onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
