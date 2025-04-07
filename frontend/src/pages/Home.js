import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <main className="hero-section">
        <div className="content-wrapper">
          <h1>Never Forget Your Essentials Again</h1>
          <p className="subtitle">
            Your AI-powered packing assistant that ensures you're always prepared
            for your next destination.
          </p>
          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">📍</span>
              <p>Create custom packing lists for any destination</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <p>Smart checklist to track your items</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <p>Reuse lists for similar trips</p>
            </div>
          </div>
          <Link to="/dashboard" className="cta-button">
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;