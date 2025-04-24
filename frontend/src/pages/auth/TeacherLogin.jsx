import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/users/login/teacher', {
                email,
                password,
                role: 'teacher'
            });

            localStorage.setItem('token', response.data.token);
            setMessage(response.data.message);
            setTimeout(() => navigate('/teacher/dashboard'), 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    // Modern UI Styles
    const styles = {
        pageContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            backgroundImage: 'radial-gradient(circle at 75% 25%, rgba(255, 107, 107, 0.1) 0%, transparent 45%), radial-gradient(circle at 25% 75%, rgba(66, 153, 225, 0.08) 0%, transparent 45%)',
            padding: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        },
        cardContainer: {
            display: 'flex',
            width: '90%',
            maxWidth: '1000px',
            minHeight: '600px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden'
        },
        leftPanel: {
            flex: '1',
            background: 'linear-gradient(135deg, #FF6B6B 0%, #8E2DE2 100%)',
            color: 'white',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        },
        brandLogo: {
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '40px',
            position: 'relative'
        },
        teacherIcon: {
            position: 'absolute',
            bottom: '-80px',
            right: '-80px',
            width: '300px',
            height: '300px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        welcomeTitle: {
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '16px',
            position: 'relative'
        },
        welcomeText: {
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '30px',
            opacity: '0.9',
            maxWidth: '400px',
            position: 'relative'
        },
        features: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative'
        },
        featureItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '15px'
        },
        featureIcon: {
            width: '24px',
            height: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px'
        },
        rightPanel: {
            flex: '1',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        formContainer: {
            maxWidth: '400px',
            margin: '0 auto',
            width: '100%'
        },
        loginHeader: {
            textAlign: 'center',
            marginBottom: '30px'
        },
        loginTitle: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#4A5568',
            marginBottom: '8px'
        },
        loginSubtitle: {
            fontSize: '15px',
            color: '#718096',
            margin: '0'
        },
        errorMessage: {
            backgroundColor: '#FEE2E2',
            color: '#B91C1C',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        successMessage: {
            backgroundColor: '#DCFCE7',
            color: '#166534',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        inputLabel: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#4A5568'
        },
        input: {
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1.5px solid #E2E8F0',
            fontSize: '15px',
            transition: 'all 0.3s ease',
            outline: 'none'
        },
        inputFocus: {
            borderColor: '#805AD5',
            boxShadow: '0 0 0 3px rgba(142, 45, 226, 0.15)'
        },
        emailHint: {
            fontSize: '12px',
            color: '#718096',
            marginTop: '4px'
        },
        forgotPassword: {
            fontSize: '14px',
            color: '#805AD5',
            textAlign: 'right',
            textDecoration: 'none',
            marginTop: '8px',
            display: 'inline-block',
            cursor: 'pointer'
        },
        loginButton: {
            padding: '14px',
            background: 'linear-gradient(to right, #FF6B6B, #8E2DE2)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
        },
        loginButtonHover: {
            opacity: '0.9',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(142, 45, 226, 0.3)'
        },
        spinner: {
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: 'white',
            animation: 'spin 0.8s linear infinite'
        },
        footer: {
            textAlign: 'center',
            marginTop: '30px'
        },
        footerText: {
            fontSize: '14px',
            color: '#718096',
            margin: '8px 0'
        },
        footerLink: {
            color: '#805AD5',
            fontWeight: '600',
            textDecoration: 'none',
            cursor: 'pointer'
        },
        roleLink: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: '#718096',
            cursor: 'pointer',
            marginTop: '20px'
        }
    };

    // Additional inline styles for focus states
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    return (
        <div style={styles.pageContainer}>
            <div style={styles.cardContainer}>
                {/* Left Panel */}
                <div style={styles.leftPanel}>
                    <h1 style={styles.brandLogo}>EduPortal</h1>
                    
                    <h2 style={styles.welcomeTitle}>Welcome, Educator!</h2>
                    <p style={styles.welcomeText}>
                        Manage your classes, create assignments, and track student performance all in one place.
                    </p>
                    
                    <div style={styles.features}>
                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>✓</div>
                            <span>Manage your classroom</span>
                        </div>
                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>✓</div>
                            <span>Create and grade assignments</span>
                        </div>
                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>✓</div>
                            <span>Track student progress</span>
                        </div>
                    </div>
                    
                    <div style={styles.teacherIcon}></div>
                </div>
                
                {/* Right Panel */}
                <div style={styles.rightPanel}>
                    <div style={styles.formContainer}>
                        <div style={styles.loginHeader}>
                            <h2 style={styles.loginTitle}>Teacher Login</h2>
                            <p style={styles.loginSubtitle}>Enter your credentials to continue</p>
                        </div>
                        
                        {error && (
                            <div style={styles.errorMessage}>
                                <span>⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}
                        
                        {message && (
                            <div style={styles.successMessage}>
                                <span>✓</span>
                                <span>{message}</span>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.inputLabel}>Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    style={{
                                        ...styles.input,
                                        ...(emailFocused ? styles.inputFocus : {})
                                    }}
                                    placeholder="your.email@ac.in"
                                    required
                                />
                                <div style={styles.emailHint}>Teacher email must end with ac.in</div>
                            </div>
                            
                            <div style={styles.inputGroup}>
                                <label style={styles.inputLabel}>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    style={{
                                        ...styles.input,
                                        ...(passwordFocused ? styles.inputFocus : {})
                                    }}
                                    placeholder="Enter your password"
                                    required
                                />
                                <span 
                                    style={styles.forgotPassword}
                                    onClick={() => navigate('/reset-password')}
                                >
                                    Forgot Password?
                                </span>
                            </div>
                            
                            <button
                                type="submit"
                                style={styles.loginButton}
                                onMouseEnter={(e) => {
                                    e.target.style.opacity = styles.loginButtonHover.opacity;
                                    e.target.style.transform = styles.loginButtonHover.transform;
                                    e.target.style.boxShadow = styles.loginButtonHover.boxShadow;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.opacity = '1';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div style={{
                                            ...styles.spinner,
                                            animation: 'spin 0.8s linear infinite'
                                        }}></div>
                                        <style>
                                            {`
                                                @keyframes spin {
                                                    0% { transform: rotate(0deg); }
                                                    100% { transform: rotate(360deg); }
                                                }
                                            `}
                                        </style>
                                        <span>Signing In...</span>
                                    </>
                                ) : 'Sign In'}
                            </button>
                        </form>
                        
                        <div style={styles.footer}>
                            <p style={styles.footerText}>
                                Don't have an account? 
                                <span 
                                    style={styles.footerLink}
                                    onClick={() => navigate('/')}
                                > Register Now</span>
                            </p>
                            
                            <div 
                                style={styles.roleLink}
                                onClick={() => navigate('/login')}
                            >
                                <span>←</span>
                                <span>Back to role selection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherLogin;