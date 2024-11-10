import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For redirection after login

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login/student', {
                email, password, role: 'student' // Specify role as student
            });

            const { token, user } = response.data;

            // Save JWT token in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setMessage(response.data.message);

            // Redirect to student dashboard
            setTimeout(() => navigate('/student/dashboard'), 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Login failed');
        }
    };

    // CSS styles 
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ced4da',
        fontSize: '16px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const textStyle = {
        marginTop: '15px',
        color: '#007bff',
        cursor: 'pointer',
    };

    return (
        <div style={containerStyle}>
            <h2>Student Login</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                >
                    Login
                </button>
                {message && <p>{message}</p>} {/* Display welcome message */}
                {error && <p>{error}</p>}
            </form>
            <p style={textStyle} onClick={() => navigate('/reset-password')}>Forgot Password?</p>
        </div>
    );
};

export default StudentLogin;
