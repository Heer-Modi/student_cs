const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🟢 User Registration
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, rollNumber, Class } = req.body;

        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            firstName: '',
            middleName: '',
            lastName: '',
            parentsName: '',
            parentsPhone: '',
            address: '',
            phone: '',
            photo: '',
            designation: '',
            department: '',
            ...(role === "student" && { rollNumber, Class }) // ✅ Store ID No & Class only for students
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// 🔵 User Login
exports.loginWithEmail = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!role || typeof role !== "string") {
            return res.status(400).json({ message: "Role is required and must be a valid string" });
        }

        // Check if user exists
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(404).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: `Welcome back, ${user.name}!`, token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// 🟠 Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password and update it
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Server error" });
    }
};
