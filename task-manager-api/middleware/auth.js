const jwt = require('jsonwebtoken');

/**
 * JWT Authentication Middleware
 * Verifies Bearer token in Authorization header
 * Attaches decoded user payload to req.user
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'No token provided. Access denied.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'secret-jwt-key-2026-lab-practical';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user payload ({ id, email, ... }) to request
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or expired token. Please log in again.',
    });
  }
};

module.exports = authMiddleware;
