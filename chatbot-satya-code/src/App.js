import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import UserChatInterface from './components/UserChatInterface/UserChatInterface';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route 
            path="/user-chat" 
            element={
              user && user.role === 'user' ? 
              <UserChatInterface user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              user && user.role === 'admin' ? 
              <AdminDashboard user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;