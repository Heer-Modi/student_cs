const User = require('../models/User'); // Use existing User schema for admins, students, and teachers
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Admin Login
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch Admin Dashboard Data
exports.getAdminDashboard = async (req, res) => {
    try {
        // Fetch statistics or other data for the admin dashboard
        const studentsCount = await User.countDocuments({ role: 'student' });
        const teachersCount = await User.countDocuments({ role: 'teacher' });

        res.status(200).json({ message: 'Admin Dashboard Data', data: { studentsCount, teachersCount } });
    } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a New User (Student or Teacher)
exports.addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!['student', 'teacher'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });

        await newUser.save();
        res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} added successfully` });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $in: ['student', 'teacher'] } }).select('-password');
        res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
