import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
  Divider
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    try {
      const response = await axios.post('/api/users/reset-password', {
        email,
        newPassword,
        confirmPassword,
      });
      setMessage(response.data.message);
      setError('');

      // Redirect to login page after successful reset
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Password reset failed');
      setMessage('');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        backgroundImage: "radial-gradient(circle at 75% 25%, rgba(76, 43, 135, 0.1) 0%, transparent 45%), radial-gradient(circle at 25% 75%, rgba(76, 43, 135, 0.08) 0%, transparent 45%)",
        padding: { xs: 2, sm: 4 }
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Left side with purple background */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
              color: 'white',
              padding: { xs: '2rem', md: '3rem' },
              width: { xs: '100%', md: '40%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: '700', mb: 3 }}>
              EduPortal
            </Typography>
            
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
              <LockResetIcon sx={{ fontSize: 50, mb: 1 }} />
            </Box>
            
            <Typography variant="h5" sx={{ mb: 2, fontWeight: '600' }}>
              Reset Password
            </Typography>
            
            <Typography sx={{ opacity: 0.8 }}>
              Create a new secure password for your account
            </Typography>
          </Box>

          {/* Right side with form */}
          <Box
            sx={{
              background: 'white',
              padding: { xs: '2rem', md: '3rem' },
              width: { xs: '100%', md: '60%' },
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3, 
                fontWeight: '600',
                color: '#2D3748'
              }}
            >
              Enter Your Details
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#4C2B87',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#4C2B87',
                  },
                }}
              />
              
              <TextField
                fullWidth
                type="password"
                label="New Password"
                variant="outlined"
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#4C2B87',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#4C2B87',
                  },
                }}
              />
              
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#4C2B87',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#4C2B87',
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
                  borderRadius: '8px',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(76, 43, 135, 0.3)',
                    opacity: 0.9,
                  },
                }}
              >
                Reset Password
              </Button>

              {message && (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 2,
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {message}
                </Alert>
              )}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 2,
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {error}
                </Alert>
              )}

              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#718096' }}>
                  Remember your password?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      color: '#4C2B87', 
                      textDecoration: 'none',
                      fontWeight: 500
                    }}
                  >
                    Back to Login
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPassword;