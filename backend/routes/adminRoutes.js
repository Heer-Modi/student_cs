const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, restrictToRole } = require('../middlewares/verifyToken');

// Admin Login
router.post('/login', adminController.loginAdmin);

// Fetch Admin Dashboard Data
router.get('/dashboard', verifyToken, restrictToRole('admin'), adminController.getAdminDashboard);

// Add a New User (Student or Teacher)
router.post('/add-user', verifyToken, restrictToRole('admin'), adminController.addUser);

// Fetch All Users
router.get('/users', verifyToken, restrictToRole('admin'), adminController.getAllUsers);

module.exports = router;
