// TeacherProfile.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const TeacherProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdateProfile = () => {
    console.log('Profile updated');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
        Update Profile
      </Button>
    </Box>
  );
};

export default TeacherProfile;
