// TeacherQueries.jsx
import React from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const TeacherQueries = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Student Queries</Typography>
      <List>
        {/* Replace with actual queries data */}
        <ListItem>
          <ListItemText primary="Query 1: Assistance needed with assignment." />
          <Button variant="contained" color="primary">Respond</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Query 2: Clarification on topic covered last class." />
          <Button variant="contained" color="primary">Respond</Button>
        </ListItem>
      </List>
    </div>
  );
};

export default TeacherQueries;
