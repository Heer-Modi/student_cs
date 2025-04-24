import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { loginUser } from '../../apiService';
import './Login.css'; // Create this CSS file with the styles below

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Email validation to ensure no special character at the beginning
    const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address: special characters are not allowed at the beginning.');
      setLoading(false);
      return;
    }

    // Password validation to ensure at least one special character
    const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one special character.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/users/login', { email, password });
      // Success handling
      setLoading(false);
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your account</p>
        </div>
        
        {error && (
          <div className="login-error">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="forgot-password">
            <Link to="/reset-password">Forgot Password?</Link>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="register-link">
          Don't have an account? <Link to="/register">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;