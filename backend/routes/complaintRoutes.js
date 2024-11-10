// routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');
const User = require('../models/User'); // Adjust path to your User model
const { protect, checkRole } = require('../middlewares/authMiddleware'); // Import middleware

// Endpoint to handle complaint submission, accessible only by students
router.post('/submit', protect, checkRole(['student']), async (req, res) => {
  const { teacherEmail, description } = req.body;

  try {
    // Find the teacher by email and ensure role is "teacher"
    const teacher = await User.findOne({ email: teacherEmail, role: 'teacher' });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Create a new complaint document with the student ID from req.user and the teacher's ID
    const newComplaint = new Complaint({
      complaintBy: req.user._id,   // Student's ID from the logged-in user
      complaintTo: teacher._id,    // Teacher's ID based on email lookup
      description,
    });

    await newComplaint.save();
    res.status(200).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ message: 'An error occurred while submitting the complaint' });
  }
});

module.exports = router;
