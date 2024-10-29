import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ViewMeetings = () => {
  const initialMeetings = [
    { id: 1, date: '2024-09-20', subject: 'Counseling Session with Dr. Smith' },
    { id: 2, date: '2024-09-25', subject: 'Career Guidance with Prof. Brown' },
  ];

  const [meetings, setMeetings] = useState(initialMeetings);

  const handleClose = (id, date) => {
    const today = new Date();
    const meetingDate = new Date(date);
    if (meetingDate > today) {
      const filteredMeetings = meetings.filter((meeting) => meeting.id !== id);
      setMeetings(filteredMeetings);
    } else {
      alert('This meeting cannot be canceled.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="h5" sx={{ color: '#f6d686', mb: 1 }}>
        Upcoming Meetings
      </Typography>
      {meetings.map((meeting) => (
        <Card
          key={meeting.id}
          sx={{ backgroundColor: '#f6d673', color: '#10184b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <CardContent>
            <Typography variant="h6">{meeting.subject}</Typography>
            <Typography variant="body2">{meeting.date}</Typography>
          </CardContent>
          <IconButton onClick={() => handleClose(meeting.id, meeting.date)}>
            <CloseIcon sx={{ color: '#10184b' }} />
          </IconButton>
        </Card>
      ))}
    </Box>
  );
};

export default ViewMeetings;
