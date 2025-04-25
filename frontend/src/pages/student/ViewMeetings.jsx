import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ViewMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/meetings/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const now = new Date();

        const filteredAndFormatted = res.data.notifications
          .map((n, idx) => {
            const combinedDateTime = new Date(`${n.date}T${n.time}`);
            return {
              id: idx + 1,
              date: combinedDateTime,
              displayDate: combinedDateTime.toLocaleDateString(),
              time: combinedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              subject: `Agenda: ${n.agenda}`,
            };
          })
          .filter((meeting) => meeting.date >= now); // Only include future or current meetings

        setMeetings(filteredAndFormatted);
      } catch (error) {
        console.error("Error fetching meeting notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#1a365d',
            fontWeight: '600',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              width: '40px',
              height: '3px',
              backgroundColor: '#3182CE',
              borderRadius: '2px',
            }
          }}
        >
          Upcoming Meetings
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: '#3182CE' }} />
        </Box>
      ) : meetings.length === 0 ? (
        <Box 
          sx={{ 
            backgroundColor: '#EBF8FF', 
            p: 3, 
            borderRadius: '8px',
            textAlign: 'center',
            color: '#2C5282',
            border: '1px dashed #90CDF4'
          }}
        >
          <Typography>No upcoming meetings scheduled.</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {meetings.map((meeting) => (
            <Card
              key={meeting.id}
              sx={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
                }
              }}
            >
              <Box sx={{ borderLeft: '4px solid #3182CE' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#1a365d', 
                      fontWeight: '600',
                      mb: 2
                    }}
                  >
                    {meeting.subject}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventNoteIcon sx={{ color: '#3182CE', fontSize: '1.2rem' }} />
                      <Typography variant="body2" sx={{ color: '#4A5568' }}>
                        {meeting.displayDate}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon sx={{ color: '#3182CE', fontSize: '1.2rem' }} />
                      <Typography variant="body2" sx={{ color: '#4A5568' }}>
                        {meeting.time}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ViewMeetings;