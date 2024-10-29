const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration route
router.post('/register', authController.register);

// Login routes for different roles
router.post('/login/student', (req, res) => authController.loginWithEmail(req, res, 'student'));
router.post('/login/teacher', (req, res) => authController.loginWithEmail(req, res, 'teacher'));
router.post('/login/admin', (req, res) => authController.loginWithEmail(req, res, 'admin'));

// Forgot Password/Reset Password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
