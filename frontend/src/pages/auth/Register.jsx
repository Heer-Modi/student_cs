import React, { useState } from 'react';
import axios from 'axios';
import regImage from '../../assets/reg1.webp'; // Update the path if necessary
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('teacher'); // Default role is Student
    const [idNo, setIdNo] = useState(''); // Student ID No
    const [studentClass, setStudentClass] = useState(''); // Student Class
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email based on role
        if (role === 'student' && !email.endsWith('edu.in')) {
            setError('Students must use an email ending with "edu.in".');
            return;
        }
        if ((role === 'teacher' || role === 'admin') && !email.endsWith('ac.in')) {
            setError('Teachers and Admins must use an email ending with "ac.in".');
            return;
        }

        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name,
                email,
                password,
                role,
                ...(role === 'student' && { rollNumber: idNo, Class: studentClass }) // Include only for students
            });

            alert(response.data.message);
            navigate(`/login/${role}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Error registering user');
        }
    };

    return (
        <div style={containerStyle}>
            <div style={registerCardStyle}>
                {/* Left section with illustration */}
                <div style={leftSectionStyle}>
                    <img
                        src={regImage}
                        alt="Register Illustration"
                        style={{ width: '80%', height: 'auto' }}
                    />
                </div>

                {/* Right section with form */}
                <div style={rightSectionStyle}>
                    <h2 style={headerStyle}>Register</h2>
                    <form onSubmit={handleSubmit} style={formStyle}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                            required
                        />

                        {/* Role Selection */}
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={inputStyle}
                            required
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>

                        {/* Show only if Student is selected */}
                        {role === 'student' && (
                            <>
                                <input
                                    type="text"
                                    placeholder="ID No"
                                    value={idNo}
                                    onChange={(e) => setIdNo(e.target.value)}
                                    style={inputStyle}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Class"
                                    value={studentClass}
                                    onChange={(e) => setStudentClass(e.target.value)}
                                    style={inputStyle}
                                    required
                                />
                            </>
                        )}

                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                        <button
                            type="submit"
                            style={buttonStyle}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                        >
                            Register
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" style={linkStyle}>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// CSS Styles (Kept exactly as before)
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e8f0fe',
};

const registerCardStyle = {
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

export default Register;
