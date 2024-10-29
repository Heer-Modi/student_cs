// Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ title, open, profilePhoto }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileNavigation = () => {
    navigate('/student/profile');
    handleClose();
  };

  const handleLogout = () => {
    navigate('/');
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: '#3f51b5',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'margin-left 0.3s ease', 
        marginLeft: open ? '240px' : '70px',
        padding: '0 20px',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600, 
            fontSize: '1.5rem', 
            letterSpacing: '0.5px',
            color: '#f6f7f9',
            marginLeft: open ? '240px' : '70px',
          }}
        >
          {title}
        </Typography>
        <IconButton onClick={handleProfileClick} sx={{ borderRadius: '50%' }}>
          <Avatar src={profilePhoto || "path/to/default/photo.jpg"} alt="Profile" sx={{ width: 45, height: 45, border: '2px solid #f6d673' }} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <Link to="/student/profile" onClick={handleClose} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem>Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
