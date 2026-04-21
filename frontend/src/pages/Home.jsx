import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to AgriHaven</h1>
          <p>Your one-stop marketplace for premium farming tools, seeds, manure, and more.</p>
          <Link to="/products" className="btn-primary">Shop Now</Link>
        </div>
      </header>
      
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Quality Seeds</h3>
            <p>100% organic and high-yielding seeds for every season.</p>
          </div>
          <div className="feature-card">
            <h3>Modern Tools</h3>
            <p>Durable and reliable tools to make your farming easier.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
