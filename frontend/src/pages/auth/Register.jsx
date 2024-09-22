import React, { useState } from 'react';
import axios from 'axios';
import regImage from '../../assets/reg.webp'; // Update the path if necessary
import { useNavigate, Link } from 'react-router-dom';

const containerStyle = {
    background: 'linear-gradient(to right, #00aaff, #0047ff)', // Gradient blue background
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
};

const formStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
};

const textStyle = {
    marginTop: '10px',
    textAlign: 'center',
};

const linkStyle = {
    color: '#ffeb3b',
    textDecoration: 'underline',
};

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default role
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For redirection after submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email based on role
        if (role === 'student' && !email.endsWith('edu.in')) {
            setError('Students must use an email ending with "edu.in".');
            return; // Prevent submission if email is invalid
        }

        if ((role === 'teacher' || role === 'admin') && !email.endsWith('ac.in')) {
            setError('Teachers and Admins must use an email ending with "ac.in".');
            return; // Prevent submission if email is invalid
        }

        // Clear any existing error messages
        setError('');

        try {
            // Make an API request to the backend
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name,
                email,
                password,
                role
            });
            alert(response.data.message); // Display success message from backend
            // Redirect based on role after successful registration
            if (role === 'student') {
                navigate('/login/student');
            } else if (role === 'teacher') {
                navigate('/login/teacher');
            } else if (role === 'admin') {
                navigate('/login/admin');
            }
        } catch (err) {
            // Handle error responses from backend
            if (err.response) {
                if (err.response.status === 400 && err.response.data.message.includes('Email is already registered')) {
                    setError('This email is already registered. Please use a different one.');
                } else {
                    setError(err.response.data.message || 'Error registering user');
                }
            } else {
                setError('Server error');
            }
        }
    };

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: 'center' }}>
                <img src={regImage} alt="Register" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <h2 style={{ textAlign: 'center' }}>Register</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
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
                </div>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <button type="submit" style={buttonStyle}>Register</button>
            </form>

            <p style={textStyle}>
                Already have an account? <Link to="/login" style={linkStyle}>Login</Link>
            </p>
        </div>
    );
};

export default Register;
