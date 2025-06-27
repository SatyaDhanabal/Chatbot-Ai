// components/LoginPage/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const users = [
    {
      username: 'satya',
      email: 'satya12@gmail.com',
      password: 'Satya@12',
      role: 'user'
    },
    {
      username: 'sugil',
      email: 'sugil12@gmail.com',
      password: 'Sugil@12',
      role: 'admin'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = users.find(
      u => u.username === formData.username &&
           u.email === formData.email &&
           u.password === formData.password
    );

    if (user) {
      onLogin(user);
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-chat');
      }
    } else {
      setError('Invalid credentials. Please check your username, email, and password.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-submit-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Test Credentials:</p>
          <p><strong>User:</strong> satya / satya12@gmail.com / Satya@12</p>
          <p><strong>Admin:</strong> sugil / sugil12@gmail.com / Sugil@12</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;