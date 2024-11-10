// ArrangeMeetingsPage.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';

const ArrangeMeetingsPage = () => {
  const [date, setDate] = useState('');
  const [className, setClassName] = useState('');
  const [time, setTime] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleArrangeMeeting = () => {
    console.log(`Meeting arranged on ${date} for class ${className} at ${time}`);
    setDate('');
    setClassName('');
    setTime('');
    setNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center',
    },
    input: {
      marginBottom: '15px',
      width: '100%',
    },
    button: {
      marginTop: '20px',
      backgroundColor: '#3f51b5',
      color: '#ffffff',
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom>Arrange Meetings</Typography>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={styles.input}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Class"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        sx={styles.input}
      />
      <TextField
        label="Time"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        sx={styles.input}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" sx={styles.button} onClick={handleArrangeMeeting}>
        Schedule Meeting
      </Button>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity="success">
          Meeting arranged successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ArrangeMeetingsPage;
