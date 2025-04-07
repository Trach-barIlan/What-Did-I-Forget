import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="floating-items">
        <span className="floating-item">✈️</span>
        <span className="floating-item">🗺️</span>
        <span className="floating-item">🧳</span>
        <span className="floating-item">📍</span>
        <span className="floating-item">🏖️</span>
        <span className="floating-item">🗽</span>
        <span className="floating-item">🏔️</span>
        <span className="floating-item">🎡</span>
        <span className="floating-item">🌴</span>
        <span className="floating-item">⛱️</span>
      </div>
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="welcome-message">
          Never forget what to pack again.<br />
          Your personal travel companion awaits!
        </p>
        <div className="feature-list">
          <span className="feature-item">
            <span>✓</span> Smart Packing Lists
          </span>
          <span className="feature-item">
            <span>✓</span> Trip Planning
          </span>
          <span className="feature-item">
            <span>✓</span> Travel Memory
          </span>
        </div>

        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="link">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;