// TeacherAttendance.jsx
import React from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const TeacherAttendance = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Attendance</Typography>
      <List>
        {/* Replace with dynamic attendance records */}
        <ListItem>
          <ListItemText primary="Student A - Present" />
          <Button variant="contained" color="secondary">Update</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Student B - Absent" />
          <Button variant="contained" color="secondary">Update</Button>
        </ListItem>
      </List>
    </div>
  );
};

export default TeacherAttendance;
