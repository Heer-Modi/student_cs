import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';

const AdminHome = () => {
  const [dashboardData, setDashboardData] = useState({
    studentsCount: 0,
    teachersCount: 0,
  });

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDashboardData(response.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Use placeholder data for development
        setDashboardData({
          studentsCount: 120,
          teachersCount: 15,
        });
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Paper
        elevation={0}
        sx={{
          overflow: 'hidden',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          mb: 4
        }}
      >
        <Box sx={{
          background: 'linear-gradient(135deg, #4C2B87 0%, #2A1650 100%)',
          color: 'white',
          padding: '24px 32px',
        }}>
          <Typography variant="h4" sx={{
            fontSize: '28px',
            fontWeight: '700',
            mb: 1
          }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Manage users, oversee platform activities, and configure system settings
          </Typography>
        </Box>
        
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Students Card */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                borderRadius: '12px',
                height: '100%'
              }}>
                <CardContent sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  padding: '24px' 
                }}>
                  <Box sx={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(76, 43, 135, 0.1)'
                  }}>
                    <SchoolIcon sx={{ color: '#4C2B87', fontSize: '35px' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#718096', fontSize: '16px', mb: 1 }}>
                      Total Students
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#2D3748', fontWeight: '700' }}>
                      {dashboardData.studentsCount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Teachers Card */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                borderRadius: '12px',
                height: '100%'
              }}>
                <CardContent sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  padding: '24px' 
                }}>
                  <Box sx={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(76, 43, 135, 0.1)'
                  }}>
                    <PersonIcon sx={{ color: '#4C2B87', fontSize: '35px' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#718096', fontSize: '16px', mb: 1 }}>
                      Total Faculty
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#2D3748', fontWeight: '700' }}>
                      {dashboardData.teachersCount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminHome;