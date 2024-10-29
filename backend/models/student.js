const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    class: { type: String },
    parentsName: { type: String, required: true },
    parentsPhone: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    photo: { type: String }, // Store photo filename or URL if uploading to cloud storage
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);
