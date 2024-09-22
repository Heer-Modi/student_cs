import React from 'react';
import { Link } from 'react-router-dom';

const LoginRoleSelect = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: '#f8f9fa', // Light background
        padding: '20px',
    };

    const titleStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#007bff', // Blue color for the title
    };

    const roleLinksContainerStyle = {
        display: 'flex', // Align boxes horizontally
        justifyContent: 'center',
        gap: '20px', // Space between the boxes
    };

    const linkStyle = {
        color: '#007bff',
        fontSize: '18px',
        textDecoration: 'none',
        border: '2px solid #007bff',
        padding: '20px 40px', // Bigger box size
        borderRadius: '10px',
        transition: 'background-color 0.3s, color 0.3s, transform 0.3s', // Add smooth scaling effect
        textAlign: 'center', // Center text inside the boxes
    };

    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = '#007bff';
        e.target.style.color = 'white';
        e.target.style.transform = 'scale(1.05)'; // Slight scale-up effect on hover
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = '#007bff';
        e.target.style.transform = 'scale(1)'; // Reset scale when hover is removed
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Select Your Role</h2>
            <div style={roleLinksContainerStyle}>
                <Link
                    to="/login/student"
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Student Login
                </Link>
                <Link
                    to="/login/teacher"
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Teacher Login
                </Link>
                <Link
                    to="/login/admin"
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Admin Login
                </Link>
            </div>
        </div>
    );
};

export default LoginRoleSelect;
