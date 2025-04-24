import React from 'react';
import { Link } from 'react-router-dom';
import './LoginRoleSelect.css'; // Make sure to create this CSS file

const LoginRoleSelect = () => {
  return (
    <div className="role-selection-page">
      <div className="role-selection-container">
        <div className="role-selection-header">
          <h1>Select Your Role</h1>
          <p>Choose the appropriate role to access your dashboard</p>
        </div>
        
        <div className="role-cards-container">
          <Link to="/login/student" className="role-card">
            <div className="role-card-inner">
              <div className="role-icon student-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" fill="currentColor" fillOpacity="0.2"/>
                  <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 20.25C3 16.7982 6.79822 14 12 14C17.2018 14 21 16.7982 21 20.25V21H3V20.25Z" fill="currentColor" fillOpacity="0.2"/>
                  <path d="M3 20.25C3 16.7982 6.79822 14 12 14C17.2018 14 21 16.7982 21 20.25V21H3V20.25Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Student</h3>
              <p>Access courses, assignments, and track your academic progress</p>
              <div className="card-hover-effect"></div>
            </div>
          </Link>
          
          <Link to="/login/teacher" className="role-card">
            <div className="role-card-inner">
              <div className="role-icon teacher-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6H19C20.1 6 21 6.9 21 8V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V8C3 6.9 3.9 6 5 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18 6H6V4C6 2.9 6.9 2 8 2H16C17.1 2 18 2.9 18 4V6Z" fill="currentColor" fillOpacity="0.2"/>
                  <path d="M18 6H6V4C6 2.9 6.9 2 8 2H16C17.1 2 18 2.9 18 4V6Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 11H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 15H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 11H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 15H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Teacher</h3>
              <p>Manage classes, create assignments, and track student performance</p>
              <div className="card-hover-effect"></div>
            </div>
          </Link>
          
          <Link to="/login/admin" className="role-card">
            <div className="role-card-inner">
              <div className="role-icon admin-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" fill="currentColor" fillOpacity="0.2"/>
                  <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 20.25C3 16.7982 6.79822 14 12 14C17.2018 14 21 16.7982 21 20.25V21H3V20.25Z" fill="currentColor" fillOpacity="0.2"/>
                  <path d="M3 20.25C3 16.7982 6.79822 14 12 14C17.2018 14 21 16.7982 21 20.25V21H3V20.25Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 9L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 6L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Admin</h3>
              <p>Manage users, configure settings, and oversee the entire platform</p>
              <div className="card-hover-effect"></div>
            </div>
          </Link>
        </div>
        
        <div className="back-to-home-link">
          <Link to="/">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="decorative-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>
    </div>
  );
};

export default LoginRoleSelect;