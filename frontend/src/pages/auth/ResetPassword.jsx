import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/reset-password', {
                email,
                newPassword,
                confirmPassword,
            });
            setMessage(response.data.message);

            // Redirect to login page after successful reset
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Password reset failed');
        }
    };

    // CSS styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#FFDC7F', // Light yellow background
        padding: '20px', // Add padding for spacing
    };

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '15px',
        boxShadow: '0 12px 25px rgba(0, 0, 0, 0.2)', // Increased blur and opacity for a stronger shadow
        padding: '30px',
        width: '400px',
    };
    

    const headerStyle = {
        fontSize: '24px',
        fontWeight: '600',
        color: '#0F67B1', // Blue header text
        marginBottom: '20px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #16325B', // Accent border
        fontSize: '16px',
        backgroundColor: '#F5F9FF', // Subtle blueish input background
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#0F67B1', // Primary blue button
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#16325B', // Darker blue on hover
    };

    const messageStyle = {
        marginTop: '10px',
        textAlign: 'center',
        fontSize: '14px',
    };

    const successMessageStyle = {
        ...messageStyle,
        color: '#0F67B1', // Blue for success message
    };

    const errorMessageStyle = {
        ...messageStyle,
        color: '#FF6F61', // Red for error message
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={headerStyle}>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#0F67B1')}
                    >
                        Set Password
                    </button>
                    {message && <p style={successMessageStyle}>{message}</p>}
                    {error && <p style={errorMessageStyle}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
