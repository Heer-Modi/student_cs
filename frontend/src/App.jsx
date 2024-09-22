import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from "./pages/auth/Register";
import StudentLogin from "./pages/auth/StudentLogin";
import TeacherLogin from "./pages/auth/TeacherLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import LoginRoleSelect from "./pages/auth/LoginRoleSelect";

function App() {
  return (
    <Router>
      <Routes>
        {/* Show the Registration form on the root path */}
        <Route path="/" element={<Register />} />

        {/* Other routes */}
        <Route path="/login" element={<LoginRoleSelect />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
