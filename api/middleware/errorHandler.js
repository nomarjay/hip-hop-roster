function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(error, _req, res, _next) {
  let status = 500;
  let message = 'Internal server error';

  if (error.name === 'ValidationError') {
    status = 400;
    message = Object.values(error.errors).map((item) => item.message).join(', ');
  } else if (error.name === 'CastError') {
    status = 400;
    message = 'Invalid resource ID';
  } else if (error.code === 11000) {
    status = 409;
    message = `${Object.keys(error.keyPattern || {})[0] || 'Value'} already exists`;
  }

  if (process.env.NODE_ENV !== 'test') console.error(error.message);
  res.status(status).json({ success: false, message });
}

module.exports = { notFound, errorHandler };
