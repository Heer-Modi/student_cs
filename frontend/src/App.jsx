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
import Analytics from './pages/admin/Analytics';
import AdminProfile from './pages/admin/AdminProfile';

// Common Components
import ComplaintForm from './components/ComplaintForm';
import ComplaintView from './components/ComplaintView';
import Notification from './components/Notification';
import TeacherNotifications from './components/TeacherNotifications';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherQueries from './pages/teacher/TeacherQueries';
import ArrangeMeetingsPage from './pages/teacher/ArrangeMeetingsPage';
import UploadDocumentsPage from './pages/teacher/UploadDocumentsPage';
import CreateGoogleFormPage from './pages/teacher/CreateGoogleFormPage';
import Logout from './pages/auth/Logout';
import Header from './components/Header';
import Footer from './components/Footer';
import TeacherHeader from './components/TeacherHeader';
import AdminHeader from './components/AdminHeader'; // New Admin Header

function AppContent() {
  const location = useLocation();
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto')); // Profile photo state

  const refreshProfilePhoto = (newPhotoUrl) => {
    if (newPhotoUrl) {
      localStorage.setItem('profilePhoto', newPhotoUrl);
      setProfilePhoto(newPhotoUrl);
    }
  };

  // Define routes for teacher and admin
  const teacherRoutes = [
    '/teacher/dashboard',
    '/teacher/arrange-meetings',
    '/teacher/upload-documents',
    '/teacher/create-google-form',
    '/teacher/profile',
    '/teacher/notifications',
    '/teacher/attendance',
    '/teacher/queries'
  ];

  const adminRoutes = [
    '/admin/dashboard',
    '/admin/user-management',
    '/admin/complaints-management',
    '/admin/notice-managment',
    '/admin/analytics',
    '/admin/profile'
  ];

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

  // Determine which header to display
  const showTeacherHeader = teacherRoutes.includes(location.pathname);
  const showAdminHeader = adminRoutes.includes(location.pathname);
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      <CssBaseline />
      {/* Conditionally render headers */}
      {showHeaderFooter && (showAdminHeader ? 
        <AdminHeader profilePhoto={profilePhoto} /> : 
        showTeacherHeader ? 
          <TeacherHeader profilePhoto={profilePhoto} /> : 
          <Header profilePhoto={profilePhoto} />
      )}

      <Routes>
        {/* Student Routes */}
        <Route path="/student/profile" element={<StudentProfile refreshProfilePhoto={refreshProfilePhoto} />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/arrange-meetings" element={<ArrangeMeetingsPage />} />
        <Route path="/teacher/upload-documents" element={<UploadDocumentsPage />} />
        <Route path="/teacher/create-google-form" element={<CreateGoogleFormPage />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/notifications" element={<TeacherNotifications />} />
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        <Route path="/teacher/queries" element={<TeacherQueries />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/complaints-management" element={<ComplaintsManagement />} />
        <Route path="/admin/notice-managment" element={<AdminNoticeManagement />} />
        <Route path="/admin/analytics" element={<Analytics />} /> 
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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
