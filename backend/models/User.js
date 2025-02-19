const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true }, // Unique email
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["student", "teacher", "admin"] },

    // Student-specific fields
    rollNumber: { type: String, default: null }, // Student ID No
    Class: { type: String, default: null }, // Student Class

    // Additional fields
    firstName: { type: String},
    middleName: { type: String},
    lastName: { type: String},
    parentsName: { type: String},
    parentsPhone: { type: String},
    address: { type: String},
    phone: { type: String},
    photo: { type: String},
    designation: { type: String},
    department: { type: String},
});

// Check if the model already exists to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
