// attendanceUtils.jsx

import React from 'react';

export const calculateAttendancePercentages = (students) => {
  const presentCount = students.filter(student => student.status === "Present").length;
  const absentCount = students.length - presentCount;
  return {
    present: (presentCount / students.length) * 100,
    absent: (absentCount / students.length) * 100,
  };
};
