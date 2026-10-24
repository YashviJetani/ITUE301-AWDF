const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const requestLogger = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const { getMetrics } = require('./utils/cache');

// Register Event Listeners for Practical 10 Asynchronous Architecture
require('./events/taskListeners');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager_db';

// 1. CORS Configuration
app.use(cors());

// 2. Body Parser
app.use(express.json());

// 3. Request Logging Middleware
app.use(requestLogger);

// Root route for health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Task Manager API is running smoothly',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        me: 'GET /auth/me',
      },
      tasks: {
        getAllTasks: 'GET /tasks (JWT Protected, Cached)',
        getTaskById: 'GET /tasks/:id (JWT Protected, Cached)',
        createTask: 'POST /tasks (JWT Protected, Cache Invalidation, Async Event)',
        updateTask: 'PUT /tasks/:id (JWT Protected, Cache Invalidation, Async Event)',
        deleteTask: 'DELETE /tasks/:id (JWT Protected, Cache Invalidation, Async Event)',
      },
      cache: {
        stats: 'GET /api/cache/stats',
      },
    },
  });
});

// Cache metrics & statistics endpoint (Practical 9)
app.get('/api/cache/stats', (req, res) => {
  res.status(200).json(getMetrics());
});

// Cache flush endpoint for testing
app.delete('/api/cache/flush', (req, res) => {
  const { cache } = require('./utils/cache');
  cache.flushAll();
  res.status(200).json({ success: true, message: 'Cache cleared successfully' });
});

// 4. API Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// 5. 404 Undefined Route Handler
app.use(notFoundHandler);

// 6. Global Error Handling Middleware (Defined LAST)
app.use(errorHandler);

// Connect to MongoDB and start server (avoid listening during automated tests)
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected successfully to database');
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📡 Cache stats available at http://localhost:${PORT}/api/cache/stats`);
      });
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1);
    });
}

module.exports = app;
