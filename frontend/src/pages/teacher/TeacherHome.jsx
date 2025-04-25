// TeacherHomePage.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  Grid,
  Paper 
} from '@mui/material';
import { Link } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TeacherHomePage = () => {
  const menuItems = [
    {
      title: 'Arrange Meetings',
      description: 'Schedule meetings with students and track attendance',
      icon: <CalendarTodayIcon sx={{ fontSize: 40 }} />,
      path: '/teacher/arrange-meetings',
      color: '#FF6B6B'
    },
    {
      title: 'Upload Documents',
      description: 'Share study materials and resources with students',
      icon: <UploadFileIcon sx={{ fontSize: 40 }} />,
      path: '/teacher/upload-documents',
      color: '#845EC2'
    },
    {
      title: 'Create Google Form',
      description: 'Create and share forms for assignments and feedback',
      icon: <InsertDriveFileIcon sx={{ fontSize: 40 }} />,
      path: '/teacher/create-google-form',
      color: '#FF9671'
    }
  ];

  return (
    <Box 
      sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        px: { xs: 2, md: 4 },
        py: 4 
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          mb: 4
        }}
      >
        <Box sx={{
          background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
          color: 'white',
          p: { xs: 3, md: 4 }
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 700,
              mb: 1
            }}
          >
            Welcome to Teacher Portal
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Manage your classroom, create assignments, and track student progress all in one place
          </Typography>
        </Box>
      </Paper>
      
      <Grid container spacing={3}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)'
                }
              }}
            >
              <Box 
                sx={{ 
                  p: 3, 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 2,
                  background: `linear-gradient(135deg, ${item.color}80 0%, ${item.color} 100%)`,
                  color: 'white'
                }}
              >
                {item.icon}
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
              </Box>
              
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography variant="body1" sx={{ color: '#4A5568', mb: 3, flexGrow: 1 }}>
                  {item.description}
                </Typography>
                
                <Button
                  component={Link}
                  to={item.path}
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    alignSelf: 'flex-start',
                    borderColor: item.color,
                    color: item.color,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: item.color,
                      backgroundColor: `${item.color}10`,
                    }
                  }}
                >
                  Go to {item.title}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeacherHomePage;