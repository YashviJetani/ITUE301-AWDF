const mongoose = require('mongoose');

// Practical 4 Supplementary: Check Content-Type header on POST and PUT
const checkContentType = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Content-Type. Expected application/json',
      });
    }
  }
  next();
};

// Practical 4 & 5 Supplementary: Validate MongoDB ObjectId format
const validateTaskId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: `Invalid task ID format: '${id}'. Must be a valid 24-character hexadecimal ObjectId.`,
    });
  }
  next();
};

module.exports = {
  checkContentType,
  validateTaskId,
};
