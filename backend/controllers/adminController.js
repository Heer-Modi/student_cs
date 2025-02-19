const User = require("../models/User"); // User schema
const Class = require("../models/Class"); // Class schema
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uploadOnCloudinary = require("../utils/cloudinary");

// Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the admin by email and role
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch Admin Dashboard Data
exports.getAdminDashboard = async (req, res) => {
  try {
    const studentsCount = await User.countDocuments({ role: "student" });
    const teachersCount = await User.countDocuments({ role: "teacher" });
    const classesCount = await Class.countDocuments();

    res.status(200).json({
      message: "Admin Dashboard Data",
      data: { studentsCount, teachersCount, classesCount },
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a New User (Student or Teacher)
exports.addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!["student", "teacher"].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res
      .status(201)
      .json({
        message: `${
          role.charAt(0).toUpperCase() + role.slice(1)
        } added successfully`,
      });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["student", "teacher"] },
    }).select("-password");
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch Admin Profile
exports.fetchAdminProfile = async (req, res) => {
  try {
    const admin = await User.findOne({ _id: req.user.id, role: "admin" });
    if (!admin) {
      return res.status(404).json({ message: "Admin profile not found" });
    }
    res.status(200).json({ admin });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Save Admin Profile
exports.saveAdminProfile = async (req, res) => {
  try {
    const { _id, name, phone, email, address } = req.body;
    // const photoPath = req.file?.path;

    // // Upload photo to Cloudinary if provided
    // let photoUploadResponse;
    // if (photoPath) {
    //     photoUploadResponse = await uploadOnCloudinary(photoPath);
    // }

    let photoPath;
    let photoUploadResponse;
    if (req.file) {
    //   photoPath = path.join("/uploads", req.file.filename);
        photoPath = req.file.path;
      photoUploadResponse = await uploadOnCloudinary(photoPath);
      if (!photoUploadResponse) {
        throw new Error("Failed to upload image");
      }
    }

    // Update admin profile
    const admin = await User.findOneAndUpdate(
      { _id: _id, role: "admin" },
      {
        name,
        phone,
        email,
        address,
        photo: photoUploadResponse?.url || undefined,
      },
      { new: true } // Return the updated document
    );

    // if (!admin) {
    //     return res.status(404).json({ message: 'Admin profile not found' });
    // }

    res
      .status(200)
      .json({ message: "Admin profile saved successfully", admin });
  } catch (error) {
    console.error("Error saving admin profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
