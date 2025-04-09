const express = require('express');
const router = express.Router();

const { uploadDocument, getStudentDocuments, downloadDocument } = require('../controllers/documentController');
const { verifyToken } = require('../middlewares/verifyToken');
const { protect, isStudent, isTeacher } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/multermiddleware');

router.post('/upload', protect, isTeacher, upload.single('document'), uploadDocument);
router.get('/my-documents', protect, isStudent, getStudentDocuments);
router.get('/download/:id', protect, isStudent, downloadDocument);

module.exports = router;
