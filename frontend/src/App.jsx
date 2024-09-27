import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@mui/material/CssBaseline';

// Authentication Pages
import Register from "./pages/auth/Register";
import StudentLogin from "./pages/auth/StudentLogin";
import TeacherLogin from "./pages/auth/TeacherLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import LoginRoleSelect from "./pages/auth/LoginRoleSelect";

// Dashboard Pages
import StudentDashboard from './pages/student/StudentDashboard';

// Common Components
import ComplaintForm from './components/ComplaintForm';
import ComplaintView from './components/ComplaintView';
import Notification from './components/Notification';
import Logout from './pages/auth/Logout';
import Header from './components/Header';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();

  // Define the paths where the Header and Footer should NOT be shown
  const noHeaderFooterRoutes = ['/', '/login', '/login/student', '/login/teacher', '/login/admin','/student/dashboard'];

  // Check if the current route is in the list where the Header and Footer should be hidden
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      <CssBaseline />
      {/* Conditionally render Header */}
      {showHeaderFooter && <Header />}

      <Routes>
        {/* Registration and Login Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LoginRoleSelect />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        {/* Student Dashboard */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Teacher and Admin Dashboards (you can add later) */}
        {/* <Route path="/teacher/*" element={<TeacherDashboard />} /> */}
        {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}

        {/* Common Components for All Roles */}
        <Route path="/complaints/add" element={<ComplaintForm />} />
        <Route path="/complaints/view" element={<ComplaintView />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/logout" element={<Logout />} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Conditionally render Footer */}
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
