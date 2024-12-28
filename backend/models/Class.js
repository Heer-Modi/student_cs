const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to teacher
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // References to students
});

module.exports = mongoose.model('Class', classSchema);
