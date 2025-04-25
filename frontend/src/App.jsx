import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@mui/material/CssBaseline';

// Authentication Pages
import Register from "./pages/auth/Register";
import StudentLogin from "./pages/auth/StudentLogin";
import TeacherLogin from "./pages/auth/TeacherLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import LoginRoleSelect from "./pages/auth/LoginRoleSelect";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherProfile from './pages/teacher/TeacherProfile';
import AdminDashboard from './pages/admin/AdminDashboard';

// Admin Specific Pages
import UserManagement from './pages/admin/UserManagement';
import ComplaintsManagement from './pages/admin/ComplaintsManagement';
import AdminNoticeManagement from './pages/admin/AdminNoticeManagement';
import AdminProfile from './pages/admin/AdminProfile';

// Common Components
import ComplaintForm from './components/ComplaintForm';
import ComplaintView from './components/ComplaintView';
import Notification from './components/Notification';
import TeacherNotifications from './components/TeacherNotifications';
import YourStudents from './pages/teacher/YourStudents';
import TeacherQueries from './pages/teacher/TeacherQueries';
import ArrangeMeetingsPage from './pages/teacher/ArrangeMeetingsPage';
import MeetingAttendancePage from './pages/teacher/MeetingAttendancePage';
import UploadDocumentsPage from './pages/teacher/UploadDocumentsPage';
import CreateGoogleFormPage from './pages/teacher/CreateGoogleFormPage';
import Logout from './pages/auth/Logout';
import Header from './components/Header';
import Footer from './components/Footer';
import TeacherHeader from './components/TeacherHeader';
import AdminHeader from './components/AdminHeader';
import MeetingList from './pages/teacher/MeetingList';

function AppContent() {
  const location = useLocation();
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto'));

  const refreshProfilePhoto = (newPhotoUrl) => {
    if (newPhotoUrl) {
      localStorage.setItem('profilePhoto', newPhotoUrl);
      setProfilePhoto(newPhotoUrl);
    }
  };

  // Simplified approach to determine which header to display
  const showTeacherHeader = location.pathname.startsWith('/teacher/');
  const showAdminHeader = location.pathname.startsWith('/admin/');
  
  const noHeaderFooterRoutes = [
    '/',
    '/login',
    '/login/student',
    '/login/teacher',
    '/login/admin',
    '/student/dashboard',
    '/reset-password',
    '/teacher/dashboard',
    '/admin/dashboard'
  ];

  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      <CssBaseline />
      {/* Conditionally render headers */}
      {showHeaderFooter && (
        showAdminHeader ? 
          <AdminHeader profilePhoto={profilePhoto} /> : 
          showTeacherHeader ? 
            <TeacherHeader profilePhoto={profilePhoto} title={getPageTitle(location.pathname)} open={true} /> : 
            <Header profilePhoto={profilePhoto} />
      )}

      <Routes>
        {/* Student Routes */}
        <Route path="/student/profile" element={<StudentProfile refreshProfilePhoto={refreshProfilePhoto} />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard/*" element={<TeacherDashboard />} />
        <Route path="/teacher/arrange-meetings" element={<ArrangeMeetingsPage />} />
        <Route path="/teacher/meetings" element={<MeetingList />} />
        <Route path="/teacher/meeting-attendance/:meetingId" element={<MeetingAttendancePage />} />
        <Route path="/teacher/upload-documents" element={<UploadDocumentsPage />} />
        <Route path="/teacher/create-google-form" element={<CreateGoogleFormPage />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/notifications" element={<TeacherNotifications />} />
        <Route path="/teacher/yourstudents" element={<YourStudents />} />
        <Route path="/teacher/queries" element={<TeacherQueries />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/complaints-management" element={<ComplaintsManagement />} />
        <Route path="/admin/notice-managment" element={<AdminNoticeManagement />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* Common Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LoginRoleSelect />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/complaints/add" element={<ComplaintForm />} />
        <Route path="/complaints/view" element={<ComplaintView />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/logout" element={<Logout />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
}

// Helper function to determine page title based on path
function getPageTitle(pathname) {
  if (pathname.includes('/teacher/dashboard')) return 'Teacher Dashboard';
  if (pathname.includes('/teacher/profile')) return 'Teacher Profile';
  if (pathname.includes('/teacher/arrange-meetings')) return 'Arrange Meetings';
  if (pathname.includes('/teacher/meetings')) return 'Your Meetings';
  if (pathname.includes('/teacher/meeting-attendance')) return 'Meeting Attendance';
  if (pathname.includes('/teacher/upload-documents')) return 'Upload Documents';
  if (pathname.includes('/teacher/create-google-form')) return 'Create Form';
  if (pathname.includes('/teacher/notifications')) return 'Notifications';
  if (pathname.includes('/teacher/yourstudents')) return 'Your Students';
  if (pathname.includes('/teacher/queries')) return 'Student Queries';
  
  return 'Teacher Portal'; // Default title
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;