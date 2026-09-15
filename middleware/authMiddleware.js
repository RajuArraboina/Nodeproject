const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const TokenBlacklist = require('../models/tokenBlacklistModel');

// Protect routes - verify Bearer token
const protect = async (req, res, next) => {
  let token;

  // Check Authorization header for Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization
      .replace(/^Bearer\s+/i, '')
      .replace(/^Bearer\s+/i, '')
      .trim()
      .replace(/^["']|["']$/g, '');
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please provide a valid Bearer token in the Authorization header.',
    });
  }

  try {
    // Check if token has been invalidated (logged out)
    const isBlacklisted = await TokenBlacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: 'You have been logged out. Please log in again.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach token and user to request (excluding password)
    req.token = token;
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed. Token is invalid or has expired.',
      error: error.message,
    });
  }
};

// Role authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : 'guest'}' is not authorized to perform this action.`,
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
