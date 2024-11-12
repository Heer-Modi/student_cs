import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CssBaseline, Toolbar, Drawer, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherSideBar from '../../components/TeacherSidebar';

const drawerWidth = 240;

const RespondToQuery = () => {
  const [open, setOpen] = useState(true);
  const [response, setResponse] = useState('');
  const { queryId } = useParams(); // Retrieve the query ID from the URL
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  const handleResponseSubmit = () => {
    console.log(`Response to Query ${queryId}:`, response);
    alert('Response submitted successfully');
    navigate('/teacher/queries'); // Navigate back to the queries list
  };

  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '700px',
      width: '90%',
      padding: '40px',
      backgroundColor: '#f5f7fb',
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: '#3f51b5',
      color: '#fff',
      marginTop: '20px',
      '&:hover': {
        backgroundColor: '#303f9f',
      },
    },
    mainContent: {
      flexGrow: 1,
      padding: '24px',
      backgroundColor: '#f6f7f9',
      transition: 'margin-left 0.3s ease',
      marginLeft: open ? `${drawerWidth}px` : '70px',
    },
    drawerStyled: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : '70px',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Drawer variant="permanent" sx={styles.drawerStyled}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <TeacherSideBar open={open} />
      </Drawer>

      <Box component="main" sx={styles.mainContent}>
        <Toolbar />
        <div style={styles.container}>
          <Typography variant="h4" gutterBottom>Respond to Query</Typography>
          <Typography variant="body1" gutterBottom>
            Query ID: {queryId}
          </Typography>
          <TextField
            label="Your Response"
            multiline
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            sx={styles.button}
            onClick={handleResponseSubmit}
          >
            Submit Response
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default RespondToQuery;
