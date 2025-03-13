// controllers/teacherController.js
const path = require("path");
const User = require("../models/User"); // ✅ Ensure only one import
const uploadOnCloudinary = require("../utils/cloudinary");

// Save or Update Teacher Profile
exports.saveTeacherProfile = async (req, res) => {
  try {
    const { _id, name, designation, phone, email, address, department } = req.body;

    // Handle photo file if provided
    let photoPath;
    let photoUploadResponse;
    if (req.file) {
      photoPath = req.file?.path;
      photoUploadResponse = await uploadOnCloudinary(photoPath);
      if (!photoUploadResponse) {
        throw new Error("Failed to upload image");
      }
    }

    // Update or create new teacher profile
    const teacher = await User.findOneAndUpdate(
      { _id: _id, role: "teacher" }, // Ensure only teacher profiles are updated
      {
        name,
        designation,
        phone,
        email,
        address,
        department,
        photo: photoUploadResponse?.url, // Update photo if a new one is provided
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Teacher profile saved successfully", teacher });
  } catch (error) {
    console.error("Error saving teacher profile:", error);
    res.status(500).json({ message: "Error saving teacher profile" });
  }
};

// Fetch Teacher Profile
exports.fetchTeacherProfile = async (req, res) => {
  try {
    const teacher = await User.findOne({
      _id: req.user.id,
      role: "teacher",
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }
    res.status(200).json({ teacher });
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    res.status(500).json({ message: "Error fetching teacher profile" });
  }
};

// ✅ Fetch all counseling students assigned to a teacher
exports.fetchCounselingStudents = async (req, res) => {
  try {
    const teacherId = req.user.id; // Get logged-in teacher's ID

    // 🔹 Find students assigned to this teacher
    const students = await User.find({ counselor: teacherId, role: "student" }).select(
      "name rollNumber department email phone parentsName parentsPhone address photo"
    );

    if (!students.length) {
      return res.status(204).json({ message: "No students assigned to you." });
    }

    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching counseling students:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ Fetch individual student profile
exports.fetchStudentProfile = async (req, res) => {
  try {
    const { rollNumber } = req.params; // Student ID from URL
    const teacherId = req.user.id; // Get the logged-in teacher's ID

    const student = await User.findOne({ rollNumber, counselor: teacherId }).select(
      "name rollNumber department email phone parentsName parentsPhone address photo"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found or not assigned to you." });
    }

    res.status(200).json({ student });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
