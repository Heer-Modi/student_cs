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

            const { token } = response.data;

            // Save JWT token in localStorage
            localStorage.setItem('token', token);

            setMessage(response.data.message);

            // Redirect to student dashboard
            setTimeout(() => navigate('/student/dashboard'), 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Login failed');
        }
    };

    // Inline CSS styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e8f0fe',
    };

    const loginCardStyle = {
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '60%',
        maxWidth: '900px',
    };

    const leftSectionStyle = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '20px',
    };

    const rightSectionStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px',
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: '600',
        color: '#4a4a4a',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const inputStyle = {
        marginBottom: '20px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ced4da',
        fontSize: '16px',
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginBottom: '20px',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const linkStyle = {
        textAlign: 'center',
        color: '#007bff',
        fontSize: '14px',
        cursor: 'pointer',
    };

    return (
        <div style={containerStyle}>
            <div style={loginCardStyle}>
                {/* Left section with illustration */}
                <div style={leftSectionStyle}>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/001/991/652/original/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg" 
                        alt="Login Illustration"
                        style={{ width: '80%', height: 'auto' }}
                    />
                </div>

                {/* Right section with form */}
                <div style={rightSectionStyle}>
                <h2 style={headerStyle}>Student Login</h2>
                    <form onSubmit={handleSubmit} style={formStyle}>
                        <input
                            type="email"
                            placeholder="Enter your username/email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={inputStyle}
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
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
                        {message && <p style={{ color: 'green' }}>{message}</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <p
                            style={linkStyle}
                            onClick={() => navigate('/reset-password')}
                        >
                            Forgot Password?
                        </p>
                        <p style={linkStyle} onClick={() => navigate('/')}>
                            Don't have an account? <b>Signup now</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
