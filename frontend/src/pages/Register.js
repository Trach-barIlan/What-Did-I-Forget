import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="floating-items">
        <span className="floating-item">✈️</span>
        <span className="floating-item">🗺️</span>
        <span className="floating-item">🧳</span>
        <span className="floating-item">📍</span>
      </div>
      <div className="auth-card register">
        <h1>Start Your Journey</h1>
        <p className="welcome-message">
          Join thousands of organized travelers who never forget<br />
          what to pack for their adventures!
        </p>
        
        <div className="feature-list">
          <span className="feature-item">
            <span>✓</span> AI-Powered Lists
          </span>
          <span className="feature-item">
            <span>✓</span> Custom Templates
          </span>
          <span className="feature-item">
            <span>✓</span> Trip Tracking
          </span>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="John Doe"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="john@example.com"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="••••••••"
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="auth-button">Create Account</button>
        </form>
        
        <p className="auth-switch">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="link">
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;