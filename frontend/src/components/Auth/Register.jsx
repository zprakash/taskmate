import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [userData, setUserData] = useState({ name: '', username: '', password: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(userData);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({...userData, name: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserData({...userData, username: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({...userData, password: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
