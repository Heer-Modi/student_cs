import React, { useState, useEffect } from 'react';
import axios from 'axios';
import regImage from '../../assets/reg1.webp';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Use the CSS file we created

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [idNo, setIdNo] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();

    // Calculate password strength
    useEffect(() => {
        let strength = 0;
        if (password.length > 0) strength += 1;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        setPasswordStrength(strength);
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate email based on role
        const emailEnding = role === 'student' ? 'edu.in' : 'ac.in';
        if (!email.endsWith(emailEnding)) {
            setError(`Email must end with ${emailEnding}`);
            setLoading(false);
            return;
        }

        // Validate password strength
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setLoading(false);
            return;
        }

        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name,
                email,
                password,
                role,
                department,
                ...(role === 'student' && { rollNumber: idNo })
            });

            // Show success message
            alert(response.data.message);
            navigate(`/login/${role}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Error registering user');
            setLoading(false);
        }
    };

    // Get strength color based on strength level
    const getStrengthColor = (strength) => {
        if (strength <= 2) return '#ff4d4d';
        if (strength <= 3) return '#ffa64d';
        if (strength === 4) return '#2ecc71';
        return '#1e88e5';
    };

    // Get strength text based on strength level
    const getStrengthText = (strength) => {
        if (strength === 0) return 'Enter password';
        if (strength <= 2) return 'Weak';
        if (strength === 3) return 'Moderate';
        if (strength === 4) return 'Strong';
        return 'Very strong';
    };

    return (
        <div className="register-container">
            {/* Left Section */}
            <div className="left-section">
                <div className="logo-container">
                    <h1 className="logo-text">EduPortal</h1>
                </div>
                
                <div className="image-container">
                    <img src={regImage} alt="Registration" className="illustration-img" />
                </div>
                
                <div className="journey-container">
                    <h2 className="journey-heading">Begin Your Learning Journey</h2>
                    <p className="journey-text">
                        Join thousands of students and educators on our platform. Access
                        courses, connect with peers, and track your progress.
                    </p>
                </div>
                
                <div className="features-container">
                    <div className="feature-item">
                        <div className="feature-icon">✓</div>
                        <span className="feature-text">Access to all courses</span>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">✓</div>
                        <span className="feature-text">Real-time collaboration</span>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">✓</div>
                        <span className="feature-text">Progress tracking</span>
                    </div>
                </div>
            </div>
            
            {/* Right Section */}
            <div className="right-section">
                <div className="form-container">
                    <h1 className="form-heading">Create Your Account</h1>
                    <p className="form-subheading">Enter your details to get started</p>
                    
                    <div className="role-selector">
                        <button 
                            onClick={() => setRole('student')} 
                            className={`role-btn ${role === 'student' ? 'active-role' : ''}`}
                        >
                            Student
                        </button>
                        <button 
                            onClick={() => setRole('teacher')} 
                            className={`role-btn ${role === 'teacher' ? 'active-role' : ''}`}
                        >
                            Teacher
                        </button>
                        <button 
                            onClick={() => setRole('admin')} 
                            className={`role-btn ${role === 'admin' ? 'active-role' : ''}`}
                        >
                            Admin
                        </button>
                    </div>
                    
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-input"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                                placeholder={`Enter your ${role} email`}
                                required
                            />
                            <div className="helper-text">
                                * Must end with {role === 'student' ? 'edu.in' : 'ac.in'}
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                placeholder="Create a strong password"
                                required
                            />
                            <div className="password-strength">
                                <span className="strength-label">Password Strength:</span>
                                <div className="strength-meter">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div 
                                            key={level} 
                                            className="meter-segment"
                                            style={{
                                                backgroundColor: passwordStrength >= level 
                                                    ? getStrengthColor(passwordStrength) 
                                                    : '#eee'
                                            }}
                                        ></div>
                                    ))}
                                </div>
                                <span 
                                    className="strength-text"
                                    style={{ color: getStrengthColor(passwordStrength) }}
                                >
                                    {getStrengthText(passwordStrength)}
                                </span>
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label>Department</label>
                            <input
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="form-input"
                                placeholder="Enter your department"
                                required
                            />
                        </div>
                        
                        {role === 'student' && (
                            <div className="input-group">
                                <label>Student ID Number</label>
                                <input
                                    type="text"
                                    value={idNo}
                                    onChange={(e) => setIdNo(e.target.value)}
                                    className="form-input"
                                    placeholder="Enter your student ID"
                                    required
                                />
                            </div>
                        )}
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="submit-button"
                        >
                            {loading ? (
                                <div className="loading-spinner">
                                    <div className="spinner"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>
                    
                    <div className="login-link">
                        Already have an account?{' '}
                        <Link to="/login" className="link">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;