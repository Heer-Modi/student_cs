// routes/teacherRoutes.js

const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middlewares/verifyToken');

// Configure multer for photo uploads with filename preservation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Preserve original file extension
  }
});

const upload = multer({ storage });

// Route to save or update teacher profile with photo upload
router.post('/profile', upload.single('photo'), teacherController.saveTeacherProfile);
router.get('/profile', verifyToken.verifyToken, teacherController.fetchTeacherProfile);

module.exports = router;
