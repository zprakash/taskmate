import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              Tasks
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
