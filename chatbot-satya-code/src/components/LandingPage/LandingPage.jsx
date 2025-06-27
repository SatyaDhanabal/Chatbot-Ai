import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [logoSrc, setLogoSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzYwYTVmYSIvPgo8cGF0aCBkPSJNMTYgOEMxMiA4IDggMTIgOCAxNkM4IDIwIDEyIDI0IDE2IDI0QzIwIDI0IDI0IDIwIDI0IDE2QzI0IDEyIDIwIDggMTYgOFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNiAxMkMxNiAxMiAxOCAxNCAxNiAxNkMxNCAxNCAxNiAxMiAxNiAxMloiIGZpbGw9IiM2MGE1ZmEiLz4KPC9zdmc+");

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleCardClick = (cardType) => {
    console.log('Card clicked:', cardType);
    navigate('/login'); // Redirect to login for now
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    fileInputRef.current.click();
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const features = [
    {
      id: 'files',
      title: 'Smart File Management',
      description: 'Organize and access your documents with intelligent categorization'
    },
    {
      id: 'upload',
      title: 'Instant Upload & Analysis',
      description: 'Upload any document format and get immediate AI-powered insights'
    },
    {
      id: 'features',
      title: 'Advanced AI Features',
      description: 'Explore cutting-edge capabilities designed for modern productivity'
    }
  ];

  return (
    <div className="landing-page">
      {/* Animated background */}
      <div className="animated-background">
        <div className="radial-gradient"></div>
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
      </div>

      {/* Header */}
      <header className="landing-header">
        <div className="header-container">
          <nav className="navigation">
            <div className="logo-section">
              <div className="logo-container">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="logo-upload-input"
                  onChange={handleLogoUpload}
                />
                <img
                  src={logoSrc}
                  alt="AI ChatBot Logo"
                  className="logo-image"
                  onClick={handleLogoClick}
                />
              </div>
              <h2 className="logo-text">AI ChatBot</h2>
            </div>
            
            <div className="auth-buttons">
              <button onClick={handleLogin} className="login-btn">
                Login
              </button>
              <button onClick={handleSignup} className="signup-btn">
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="landing-main">
        <div className="main-container">
          {/* Hero Section */}
          <div className="hero-section">
            <h1 className="main-title">
              <span className="title-line-1">Next-Gen AI</span>
              <br />
              <span className="title-line-2">Assistant Platform</span>
            </h1>
            
            <p className="main-description">
              Revolutionize your workflow with our <span className="highlight-text">intelligent AI companion</span>.
              Upload documents, engage in natural conversations, and unlock insights with state-of-the-art machine learning technology.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="feature-cards">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                onClick={() => handleCardClick(feature.id)}
                className="feature-card"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="card-content">
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="cta-section">
            <p className="cta-text">Experience the future of AI assistance</p>
            <button onClick={handleGetStarted} className="cta-button">
              <span className="cta-content">
                <span>Get Started Now</span>
                <span className="cta-arrow">→</span>
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;