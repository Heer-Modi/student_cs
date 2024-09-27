import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear user session, if stored
    // Optionally, redirect to login
    navigate('/login');
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen}>
        <Avatar alt="User Avatar" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Typography textAlign="center">
            <Link to="/profile">Profile</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Typography textAlign="center">Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;
