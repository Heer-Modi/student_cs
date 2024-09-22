const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    // Ensure the token is in the correct format
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'No token or invalid token format' });
    }

    try {
        // Split 'Bearer' from the token and verify
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Middleware to restrict access based on role
exports.restrictToRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
