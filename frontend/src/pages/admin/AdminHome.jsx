import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

const AdminHome = () => {
  const [dashboardData, setDashboardData] = useState({
    studentsCount: 0,
    teachersCount: 0,
    
  });

  // Common styles for the component
  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '700px',
      padding: '20px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    card: {
      backgroundColor: '#f6d673',
      color: '#10184b',
      padding: '12px 16px',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardLabel: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textTransform: 'none',
      color: '#10184b',
    },
    valueText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#3f51b5',
    },
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for auth
          },
        });
        setDashboardData(response.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box sx={styles.container}>
      

      {/* Total Students */}
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h6" sx={styles.cardLabel}>
            Total Students
          </Typography>
          <Typography variant="h5" sx={styles.valueText}>
            {dashboardData.studentsCount}
          </Typography>
        </CardContent>
      </Card>

      {/* Total Faculty */}
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h6" sx={styles.cardLabel}>
            Total Faculty
          </Typography>
          <Typography variant="h5" sx={styles.valueText}>
            {dashboardData.teachersCount}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminHome;
