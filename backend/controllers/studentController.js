const path = require("path");
const Student = require("../models/User");
const uploadOnCloudinary = require("../utils/cloudinary");

// 🟢 Save or Update Student Profile
exports.saveStudentProfile = async (req, res) => {
  try {
    const {
      _id,
      firstName,
      lastName,
      rollNumber, // ✅ Added Roll Number
      Class,
      parentsName,
      parentsPhone,
      address,
      phone,
    } = req.body;

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

    // ✅ Check if student already exists and update, else create new student profile
    const student = await Student.findOneAndUpdate(
      { _id: _id }, 
      {
        firstName,
        lastName,
        rollNumber, // ✅ Added Roll Number
        Class,
        parentsName,
        parentsPhone,
        address,
        phone,
        photo: photoUploadResponse?.url, 
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Student profile saved successfully", student });
  } catch (error) {
    console.error("Error saving student profile:", error);
    res.status(500).json({ message: "Error saving student profile" });
  }
};

// 🟢 Fetch Student Profile
exports.fetchStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.user.id });
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }
    res.status(200).json({ student });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Error fetching student profile" });
  }
};
