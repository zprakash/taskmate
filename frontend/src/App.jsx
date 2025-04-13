import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Auth from './pages/Auth';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ user }) => (
            <div className="app-container">
              {user ? (
                <div className="layout">
                  <Sidebar />
                  <div className="main-content">
                    <Header />
                    <Routes>
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/auth" element={<Auth />} />
                    </Routes>
                  </div>
                </div>
              ) : (
                <Auth />
              )}
            </div>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
};

export default App;
