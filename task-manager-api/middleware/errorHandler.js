// Practical 4 & 5 & 12: Global Error Handling Middleware and 404 Handler

// Custom 404 Handler for undefined routes
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found',
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
};

// Global Error Handler
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Server Error:', err.message);
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: messages,
    });
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Resource not found with id: ${err.value}`,
    });
  }

  // Generic internal server error
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
