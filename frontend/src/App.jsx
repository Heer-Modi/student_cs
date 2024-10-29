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

// Common Components
import ComplaintForm from './components/ComplaintForm';
import ComplaintView from './components/ComplaintView';
import Notification from './components/Notification';
import Logout from './pages/auth/Logout';
import Header from './components/Header';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  // Initialize from localStorage and allow updates only on new uploads
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto'));

  const refreshProfilePhoto = (newPhotoUrl) => {
    // Update both localStorage and state only if a new photo URL is provided
    if (newPhotoUrl) {
      localStorage.setItem('profilePhoto', newPhotoUrl);
      setProfilePhoto(newPhotoUrl);
    }
  };

  const noHeaderFooterRoutes = ['/', '/login', '/login/student', '/login/teacher', '/login/admin', '/student/dashboard', '/reset-password'];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      <CssBaseline />
      {showHeaderFooter && <Header profilePhoto={profilePhoto} />} {/* Pass the photo URL to Header */}

      <Routes>
        <Route path="/student/profile" element={<StudentProfile refreshProfilePhoto={refreshProfilePhoto} />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LoginRoleSelect />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/complaints/add" element={<ComplaintForm />} />
        <Route path="/complaints/view" element={<ComplaintView />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/logout" element={<Logout />} />
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
