import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { loginUser } from '../../apiService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation to ensure no special character at the beginning
    const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address: special characters are not allowed at the beginning.');
      return;
    }

    // Password validation to ensure at least one special character
    const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!passwordRegex.test(password)) {
      alert('Password must contain at least one special character.');
      return;
    }

    try {
      await axios.post('/api/users/login', { email, password });
      alert('Login successful');
    } catch (error) {
      alert('Error logging in');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
  };

  const formContainerStyle = {
    backgroundColor: '#007bff', // Blue color
    color: 'white',
    padding: '25px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    width: '100%',
    marginBottom: '15px',
  };

  const buttonStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#0056b3', // Darker blue
    color: 'white',
    cursor: 'pointer',
    width: '100%', // Make button fill the container width
    maxWidth: '200px', // Set a max width to make it longer
    margin: '0 auto', // Center the button
};

  const textStyle = {
    marginTop: '15px',
    fontSize: '14px',
    color: '#fff',
  };

  const linkStyle = {
    color: '#ffcccb', // Soft red for the link
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        {/* Add this for the register link */}
        <p style={textStyle}>
          Don't have an account? <Link to="/register" style={linkStyle}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;