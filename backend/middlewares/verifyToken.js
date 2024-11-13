const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Now req.user has the decoded token data (id, role)
        next();
    } catch (error) {
        console.error('JWT authentication error:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Middleware to restrict access based on role
exports.restrictToRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
