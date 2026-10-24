/**
 * Input Validation Middleware Pipeline
 * Validates and sanitizes request payloads before reaching database or controller logic
 */

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password is required and must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: errors.join(', '),
      errors,
    });
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !email.trim()) {
    errors.push('Email is required');
  }

  if (!password || !password.trim()) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: errors.join(', '),
      errors,
    });
  }

  req.body.email = email.trim().toLowerCase();
  next();
};

const validateTask = (req, res, next) => {
  const { title, priority, completed } = req.body;
  const errors = [];

  if (req.method === 'POST') {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      errors.push('Task title is required');
    } else if (title.trim().length < 3) {
      errors.push('Task title must be at least 3 characters long');
    }
  } else if (req.method === 'PUT' && title !== undefined) {
    if (typeof title !== 'string' || title.trim().length < 3) {
      errors.push('Task title must be at least 3 characters long');
    }
  }

  if (priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high', 'urgent', 'normal'];
    if (!validPriorities.includes(String(priority).toLowerCase())) {
      errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
    }
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push('Completed status must be a boolean (true or false)');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: errors.join(', '),
      errors,
    });
  }

  if (title) req.body.title = title.trim();
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateTask,
};
