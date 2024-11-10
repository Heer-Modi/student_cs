const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// Middleware to verify and attach user info from token
exports.protect = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // Fetch user from DB, exclude password
    if (!req.user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to check if user has one of the specified roles
exports.checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ msg: 'Access denied: Insufficient role' });
  }
  next();
};
