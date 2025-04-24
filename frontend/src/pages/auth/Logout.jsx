import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    
    // Redirect to login after a short delay
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>Logging Out</h2>
        <p>You have been logged out successfully.</p>
        <p>Redirecting to login page...</p>
        <div style={{
          width: '40px',
          height: '40px',
          margin: '20px auto',
          border: '4px solid #f0f0f0',
          borderTop: '4px solid #f5576c',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Logout;