import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  CssBaseline,
  Toolbar,
  Drawer,
  IconButton
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TeacherSideBar from '../../components/TeacherSidebar';

const drawerWidth = 240;

const TeacherQueries = () => {
  const [open, setOpen] = useState(true);
  const [queries, setQueries] = useState([
    { id: 1, text: 'Assistance needed with assignment.' },
    { id: 2, text: 'Clarification on topic covered last class.' },
  ]);
  const [activeQueryId, setActiveQueryId] = useState(null);
  const [responseText, setResponseText] = useState('');

  const toggleDrawer = () => setOpen(!open);

  // Show response form for the selected query
  const handleRespondClick = (queryId) => {
    setActiveQueryId(queryId);
  };

  // Handle submitting a response
  const handleSubmitResponse = (queryId) => {
    setQueries(queries.filter((query) => query.id !== queryId)); // Remove query from list
    setActiveQueryId(null); // Close response form
    setResponseText(''); // Clear response text
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
      textAlign: 'center', // Center-align heading
    },
    heading: {
      color: '#2a9d8f', // Green color for heading
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: '600',
    },
    listItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'start',
      backgroundColor: '#e3f2fd',
      margin: '10px 0',
      padding: '15px',
      borderRadius: '8px',
      border: '2px solid #f6d673', // Yellow border
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: '#2a9d8f', // Green color for button
      color: '#fff',
      alignSelf: 'flex-end',
      '&:hover': {
        backgroundColor: '#21867a',
      },
      marginTop: '10px',
    },
    responseContainer: {
      marginTop: '10px',
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      width: '100%',
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
          <Typography variant="h4" style={styles.heading}>
            Student Queries
          </Typography>
          <List>
            {queries.map((query) => (
              <ListItem key={query.id} style={styles.listItem}>
                <ListItemText primary={`Query: ${query.text}`} />
                <Button
                  variant="contained"
                  sx={styles.button}
                  onClick={() => handleRespondClick(query.id)}
                >
                  Respond
                </Button>

                {/* Show response container if this query is active */}
                {activeQueryId === query.id && (
                  <Box sx={styles.responseContainer}>
                    <TextField
                      label="Write your response"
                      multiline
                      rows={3}
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      sx={{ ...styles.button, marginTop: '10px' }}
                      onClick={() => handleSubmitResponse(query.id)}
                    >
                      Submit Response
                    </Button>
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </div>
      </Box>
    </Box>
  );
};

export default TeacherQueries;
