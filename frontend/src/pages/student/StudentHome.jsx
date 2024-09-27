import React from 'react';
import Notification from '../../components/Notification';
import ViewMeetings from './ViewMeetings';
import ViewDocuments from './ViewDocuments';

const StudentHomePage = () => {
  return (
    <div>
      <Notification />
      <ViewMeetings />
      <ViewDocuments />
    </div>
  );
};

export default StudentHomePage;
