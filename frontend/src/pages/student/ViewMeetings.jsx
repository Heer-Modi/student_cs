import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import axios from 'axios';

const ViewMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/meetings/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatted = res.data.notifications.map((n, idx) => {
          // Combine date and time into one Date object
          const combinedDateTime = new Date(`${n.date}T${n.time}`);
          return {
            id: idx + 1,
            date: combinedDateTime.toLocaleDateString(),
            time: combinedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            subject: `Agenda: ${n.agenda}`,
          };
        });


        setMeetings(formatted);
      } catch (error) {
        console.error("Error fetching meeting notifications:", error);
      }
    };
    fetchNotifications();
  }, []);



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
            <Typography variant="body2">Time: {meeting.time}</Typography>

          </CardContent>

        </Card>
      ))}
    </Box>
  );
};

export default ViewMeetings;
