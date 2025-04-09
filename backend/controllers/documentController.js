const path = require('path');
const Document = require('../models/Document');
const User = require('../models/User');
const uploadOnCloudinary = require('../utils/cloudinary');

// Upload Document (Only Teachers)
const uploadDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    const teacherId = req.user.id;

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const localFilePath = req.file.path;
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
    if (!cloudinaryResponse) {
      return res.status(500).json({ message: 'File upload failed' });
    }

    const students = await User.find({ counselor: teacherId, role: 'student' }).select('_id');

    const newDocument = new Document({
      title,
      description,
      fileUrl: cloudinaryResponse.secure_url,
      uploadedBy: teacherId,
      accessList: students.map(student => student._id),
    });

    await newDocument.save();

    res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Documents (Only Students)
const getStudentDocuments = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const documents = await Document.find({ accessList: studentId });

    res.status(200).json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Download Document with Access Check
const downloadDocument = async (req, res) => {
  try {
    const studentId = req.user.id;
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    // Check if student has access to this document
    if (!document.accessList.includes(studentId)) {
      return res.status(403).json({ message: 'Access denied: You do not have permission to access this document.' });
    }

    // Redirect to Cloudinary URL
    return res.redirect(document.fileUrl);
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  uploadDocument,
  getStudentDocuments,
  downloadDocument,
};
