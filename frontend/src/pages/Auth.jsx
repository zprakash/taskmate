import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Register onSwitch={() => setIsLogin(true)} />
      )}
      <div className="text-center mt-4">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:text-blue-800"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
