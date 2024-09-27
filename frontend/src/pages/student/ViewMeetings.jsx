import React from 'react';

const ViewMeetings = () => {
  const meetings = [
    { id: 1, date: '2024-09-20', subject: 'Counseling Session with Dr. Smith' },
    { id: 2, date: '2024-09-25', subject: 'Career Guidance with Prof. Brown' },
  ];

  return (
    <div>
      <h2>Upcoming Meetings</h2>
      <ul>
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            {meeting.date}: {meeting.subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMeetings;
