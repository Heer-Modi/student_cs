// controllers/teacherController.js

const path = require('path');
const Teacher = require('../models/User'); // Reuse the User model as it includes the teacher fields
const uploadOnCloudinary = require('../utils/cloudinary');

// Save or Update Teacher Profile
exports.saveTeacherProfile = async (req, res) => {
    try {
        const { _id, name, designation, phone, email, address, department } = req.body;

        // Handle photo file if provided
        //let photoPath;
        //if (req.file) {
           // photoPath = path.join('/uploads', req.file.filename);
        //}
        const photoPath = req.file?.path;
        const photoUploadResponse = await uploadOnCloudinary(photoPath);

        if (!photoUploadResponse) {
            throw new ApiError(500, "Failed to upload image");
        }

        // Update or create new teacher profile
        const teacher = await Teacher.findOneAndUpdate(
            { _id: _id, role: 'teacher' }, // Ensure only teacher profiles are updated
            {
                name,
                designation,
                phone,
                email,
                address,
                department,
                photo: photoUploadResponse.url // Update photo if a new one is provided
            },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Teacher profile saved successfully', teacher });
    } catch (error) {
        console.error('Error saving teacher profile:', error);
        res.status(500).json({ message: 'Error saving teacher profile' });
    }
};

// Fetch Teacher Profile
exports.fetchTeacherProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ _id: req.user.id, role: 'teacher' });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher profile not found' });
        }
        res.status(200).json({ teacher });
    } catch (error) {
        console.error('Error fetching teacher profile:', error);
        res.status(500).json({ message: 'Error fetching teacher profile' });
    }
};
