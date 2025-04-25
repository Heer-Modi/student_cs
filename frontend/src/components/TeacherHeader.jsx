// TeacherHeader.jsx
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const TeacherHeader = ({ title, open, profilePhoto }) => {
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
    navigate('/teacher/profile');
    handleClose();
  };
   
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/teachers/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setProfile(response.data.teacher);
      } catch (error) {
        console.error("Error fetching teacher profile:", error);
      }
    };
    fetchProfile();
  }, []);
   
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
        width: `calc(100% - ${open ? '240px' : '70px'})`,
        marginLeft: open ? '240px' : '70px',
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600, 
            fontSize: '1.5rem', 
            letterSpacing: '0.5px',
            color: 'white',
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.9, display: { xs: 'none', sm: 'block' } }}>
            {profile.name || 'Teacher'}
          </Typography>
          
          <IconButton 
            onClick={handleProfileClick} 
            sx={{ 
              p: 0,
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.2s ease',
              '&:hover': {
                border: '2px solid rgba(255, 255, 255, 0.6)',
              }
            }}
          >
            <Avatar 
              src={profile.photo || ""} 
              alt="Profile" 
              sx={{ 
                width: 40, 
                height: 40,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }} 
            />
          </IconButton>
        </Box>
        
        <Menu 
          anchorEl={anchorEl} 
          open={Boolean(anchorEl)} 
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1.5,
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              minWidth: '150px',
            }
          }}
        >
          <MenuItem onClick={handleProfileNavigation} sx={styles.menuItem}>
            <PersonIcon sx={styles.menuIcon} />
            <Typography variant="body2">Profile</Typography>
          </MenuItem>
          
          <MenuItem onClick={handleLogout} sx={styles.menuItem}>
            <ExitToAppIcon sx={styles.menuIcon} />
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    padding: '10px 16px',
    '&:hover': {
      backgroundColor: 'rgba(142, 45, 226, 0.05)',
    }
  },
  menuIcon: {
    fontSize: '1.2rem',
    color: '#8E2DE2',
  }
};

export default TeacherHeader;