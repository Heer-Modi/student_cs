// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// // Registration logic
// exports.register = async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword, role });
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Common login logic for roles with email
// exports.loginWithEmail = async (req, res,role) => {
//     const { email, password } = req.body;
//     console.log(req.body)
//     try {
//         const user = await User.findOne({ email, role });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         res.status(200).json({
//             message: `Welcome Back, ${user.name}!`,
//             role: user.role
//         });
//     } catch (error) {
//         console.error(`Error logging in ${role}:`, error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Login logic for students
// exports.loginStudent = async (req, res) => {
//     const { rollNumber, name, password } = req.body;

//     console.log(req.body);
//     try {
//         const user = await User.findOne({ rollNumber, name, role: 'student' });
//         if (!user) {
//             return res.status(404).json({ message: 'Student not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         res.status(200).json({
//             message: `Welcome Back, ${user.name}!`,
//             role: user.role
//         });
//     } catch (error) {
//         console.error('Error logging in student:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Registration logic
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role, // role can be 'student', 'teacher', or 'admin'
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Common login logic for all users (student, teacher, admin) with email and password
exports.loginWithEmail = async (req, res,role) => {
    const { email, password } = req.body; // Ensure role is sent from the frontend

    // Check if the role is defined
    if (!role || typeof role !== 'string') {
        return res.status(400).json({ message: 'Role is required and must be a valid string' });
    }

    try {
        // Find user by email and role
        const user = await User.findOne({ email, role }); // Filter based on role
        if (!user) {
            return res.status(404).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token with user ID and role
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: `Welcome back, ${user.name}!`,
            token, // Send token to frontend
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
