// studentController.js

const path = require('path');
const Student = require('../models/student');

exports.saveStudentProfile = async (req, res) => {
    try {
        const { firstName, middleName, lastName, class: className, parentsName, parentsPhone, address, phone } = req.body;

        // Handle photo file if provided
        let photoPath;
        if (req.file) {
            photoPath = path.join('/uploads', req.file.filename); // Save the relative path to the photo
        }

        // Check if student already exists and update, else create new student profile
        const student = await Student.findOneAndUpdate(
            { phone }, // Use phone number as unique identifier for updating
            {
                firstName,
                lastName,
                class: className,
                parentsName,
                parentsPhone,
                address,
                phone,
                photo: photoPath || undefined // Only update photo if a new one is provided
            },
            { new: true, upsert: true } // Create if doesn't exist
        );

        res.status(200).json({ message: 'Student profile saved successfully', student });
    } catch (error) {
        console.error('Error saving student profile:', error);
        res.status(500).json({ message: 'Error saving student profile' });
    }
};
