const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');
const { validateTask } = require('../middleware/validateInput');
const { validateTaskId, checkContentType } = require('../middleware/validate');
const {
  cache,
  recordHit,
  recordMiss,
  invalidateTaskCache,
} = require('../utils/cache');
const taskEvents = require('../events/taskEvents');

const router = express.Router();

// Content-Type validation on mutations
router.use(checkContentType);

// Protect ALL task routes with JWT Authentication Middleware (Practical 7)
router.use(authMiddleware);

/**
 * @route   GET /tasks
 * @desc    Get all tasks (with in-memory node-cache, Practical 9)
 * @access  Private (JWT Protected)
 */
router.get('/', async (req, res, next) => {
  try {
    const cacheKey = 'all_tasks';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      recordHit();
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json({
        success: true,
        source: 'cache',
        count: cachedData.length,
        data: cachedData,
      });
    }

    recordMiss();
    res.setHeader('X-Cache', 'MISS');
    const tasks = await Task.find().sort({ createdAt: -1 });

    // Store in node-cache with 60s standard TTL
    cache.set(cacheKey, tasks, 60);

    res.status(200).json({
      success: true,
      source: 'database',
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /tasks/:id
 * @desc    Get single task by ID (cached with 60s TTL)
 * @access  Private (JWT Protected)
 */
router.get('/:id', validateTaskId, async (req, res, next) => {
  try {
    const cacheKey = `task_${req.params.id}`;
    const cachedTask = cache.get(cacheKey);

    if (cachedTask) {
      recordHit();
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json({
        success: true,
        source: 'cache',
        data: cachedTask,
      });
    }

    recordMiss();
    res.setHeader('X-Cache', 'MISS');
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task not found with id: ${req.params.id}`,
      });
    }

    cache.set(cacheKey, task, 60);

    res.status(200).json({
      success: true,
      source: 'database',
      data: task,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   POST /tasks
 * @desc    Create a new task, invalidate cache, emit task-created event
 * @access  Private (JWT Protected)
 */
router.post('/', validateTask, async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;

    const newTask = await Task.create({
      title,
      description,
      completed,
      priority,
    });

    // Invalidate cache immediately after write (Practical 9)
    invalidateTaskCache();

    const responseTimestamp = new Date().toISOString();
    console.log(`[API RESPONSE] HTTP 201 Created sent to client at ${responseTimestamp}`);

    // Return response immediately before background event processing (Practical 10)
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask,
    });

    // Emit asynchronous event after response is dispatched
    taskEvents.emit('task-created', {
      task: newTask,
      user: req.user,
      timestamp: responseTimestamp,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   PUT /tasks/:id
 * @desc    Update task, invalidate cache, emit task-updated event
 * @access  Private (JWT Protected)
 */
router.put('/:id', validateTaskId, validateTask, async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, priority },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task not found with id: ${req.params.id}`,
      });
    }

    // Invalidate cache for all tasks and this specific task
    invalidateTaskCache(req.params.id);

    const responseTimestamp = new Date().toISOString();
    console.log(`[API RESPONSE] HTTP 200 OK sent for task update at ${responseTimestamp}`);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });

    taskEvents.emit('task-updated', {
      task: updatedTask,
      user: req.user,
      timestamp: responseTimestamp,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   DELETE /tasks/:id
 * @desc    Delete task, invalidate cache, emit task-deleted event
 * @access  Private (JWT Protected)
 */
router.delete('/:id', validateTaskId, async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task not found with id: ${req.params.id}`,
      });
    }

    // Invalidate cache
    invalidateTaskCache(req.params.id);

    const responseTimestamp = new Date().toISOString();
    console.log(`[API RESPONSE] HTTP 200 OK sent for task deletion at ${responseTimestamp}`);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask,
    });

    taskEvents.emit('task-deleted', {
      taskId: req.params.id,
      user: req.user,
      timestamp: responseTimestamp,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
