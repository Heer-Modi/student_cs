const express = require('express');
const router = express.Router();

const { uploadDocument, getStudentDocuments } = require('../controllers/documentController');
const { verifyToken } = require('../middlewares/verifyToken');
const { isTeacher, isStudent } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/multermiddleware');

// Route to upload a document (Teachers only)
router.post('/upload', verifyToken, isTeacher, upload.single('document'), uploadDocument);

// Route to get documents (Students only)
router.get('/my-documents', verifyToken, isStudent, getStudentDocuments);

module.exports = router;
