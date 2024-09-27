import React from 'react';

const Notification = () => {
  const notifications = [
    { id: 1, message: 'Meeting with counselor scheduled for 2024-09-20' },
    { id: 2, message: 'New document uploaded: Career Roadmap' },
  ];

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
