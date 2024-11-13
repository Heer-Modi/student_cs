const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration logic
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    firstName = '';
    middleName = '';
    lastName = '';
    Class = '';
    parentsName = '';
    parentsPhone = '';
    address = '';
    phone = '';
    photo = '';
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role, // role can be 'student', 'teacher', or 'admin'
            firstName,
            middleName,
            lastName,
            Class,
            parentsName,
            parentsPhone,
            address,
            phone,
            photo,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login logic for different roles
exports.loginWithEmail = async (req, res, role) => {
    const { email, password } = req.body;
    if (!role || typeof role !== 'string') {
        return res.status(400).json({ message: 'Role is required and must be a valid string' });
    }

    try {
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(404).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: `Welcome back, ${user.name}!`,
            token
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset password logic
exports.resetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
