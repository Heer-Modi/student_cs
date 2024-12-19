import React from 'react';
import { Link } from 'react-router-dom';
import studentImage from '../../assets/student1.webp'; // Adjust the path if needed
import teacherImage from '../../assets/teacher.webp';
import adminImage from '../../assets/admin.png';

const LoginRoleSelect = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align to top
        height: '100vh', // Full viewport height
        backgroundColor: '#FFDC7F', // Light yellow background
        padding: '40px',
    };

    const titleStyle = {
        fontSize: '40px',
        fontWeight: 'bold',
        marginBottom: '60px', // Increased gap below the title
        color: '#0F67B1', // Blue color for the title
        marginTop: '20px', // Add some space from the top
    };


    const roleLinksContainerStyle = {
        display: 'flex', // Align boxes horizontally
        justifyContent: 'center',
        gap: '40px', // Increase space between the boxes
    };

    const linkStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0F67B1',
        fontSize: '20px',
        textDecoration: 'none',
        border: '3px solid #16325B',
        padding: '30px',
        borderRadius: '15px',
        transition: 'background-color 0.3s, color 0.3s, transform 0.3s', // Add smooth scaling effect
        backgroundColor: '#FFFFFF', // White background for buttons
        textAlign: 'center', // Center text inside the boxes
        width: '200px', // Bigger width for the role containers
        height: '250px', // Bigger height for the role containers
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // Subtle shadow for buttons
    };

    const imageStyle = {
        width: '100px', // Larger image size
        height: '100px',
        marginBottom: '15px',
    };

    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = '#0F67B1';
        e.target.style.color = 'white';
        e.target.style.transform = 'scale(1.05)'; // Slight scale-up effect on hover
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = '#FFFFFF';
        e.target.style.color = '#0F67B1';
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
                    <img src={studentImage} alt="Student" style={imageStyle} />
                    Student Login
                </Link>
                <Link
                    to="/login/teacher"
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={teacherImage} alt="Teacher" style={imageStyle} />
                    Teacher Login
                </Link>
                <Link
                    to="/login/admin"
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={adminImage} alt="Admin" style={imageStyle} />
                    Admin Login
                </Link>
            </div>
        </div>
    );
};

export default LoginRoleSelect;
