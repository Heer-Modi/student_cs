const express = require('express');
const { verifyToken, restrictToRole } = require('../middlewares/verifyToken');
const router = express.Router();

// Student dashboard route (only accessible by students)
router.get('/student/dashboard', verifyToken, restrictToRole('student'), (req, res) => {
    res.json({ message: 'Welcome to the student dashboard', user: req.user  });
});

// Teacher dashboard route (only accessible by teachers)
router.get('/teacher/dashboard', verifyToken, restrictToRole('teacher'), (req, res) => {
    res.json({ message: 'Welcome to the teacher dashboard',user: req.user  });
});

// Admin dashboard route (only accessible by admins)
router.get('/admin/dashboard', verifyToken, restrictToRole('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard',user: req.user  });
});

module.exports = router;
