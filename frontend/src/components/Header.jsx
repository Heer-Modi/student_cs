// Header.jsx
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ title, open, profilePhoto }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState({});
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch token from localStorage
        const response = await axios.get("/api/students/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authorization
          },
        });
        console.log(response.data)
        setProfile(response.data.student);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    };
    fetchProfile();
  }, []
  )

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
          <Avatar src={profile.photo || "path/to/default/photo.jpg"} alt="Profile" sx={{ width: 45, height: 45, border: '2px solid #f6d673' }} />
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
