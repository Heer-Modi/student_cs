const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true }, // Optional if not used and unique for preventing duplicates
    rollNumber: { type: String }, // Only for student
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['student', 'teacher', 'admin'] }
});

// Check if the model already exists to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
