import React, { useState } from 'react';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe', // Example data
    email: 'johndoe@example.com',
    rollNumber: '12345',
  });

  return (
    <div>
      <h2>Student Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Roll Number: {profile.rollNumber}</p>
    </div>
  );
};

export default StudentProfile;
