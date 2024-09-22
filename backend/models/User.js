const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String }, // Optional if not used
    rollNumber: { type: String }, // Only for student
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['student', 'teacher', 'admin'] }
});

module.exports = mongoose.model('User', userSchema);
