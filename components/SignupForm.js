// client/components/SignupForm.js

import React from 'react';

const SignupForm = ({ signupInfo, setSignupInfo, handleSignup }) => {
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={signupInfo.username}
          onChange={(e) => setSignupInfo({ ...signupInfo, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={signupInfo.password}
          onChange={(e) => setSignupInfo({ ...signupInfo, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
