import React from 'react';

export const Login = () => {
  return (
    <div>
      <form action='/api/auth' method='post'>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Login;
