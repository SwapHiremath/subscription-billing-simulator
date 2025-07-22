// Centralized error handling middleware for all APIs
module.exports = (err, req, res, next) => {
  // Default to 500 Internal Server Error if status code not set
  const statusCode = err.statusCode || err.status || 500;

  // Basic error response structure
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    // Optionally include stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}; 