import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

/**
 * Personal Task Tracker (Matching Reference Image 1)
 * Clean, simple, and direct full-stack task manager connected to Express + MongoDB.
 */
function TasksManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      // Update existing task
      try {
        const res = await updateTask(editingId, {
          title: title.trim(),
          description: description.trim(),
          completed,
        });
        setTasks((prev) => prev.map((t) => (t._id === editingId ? res.data : t)));
        resetForm();
      } catch (err) {
        alert('Failed to update task: ' + err.message);
      }
    } else {
      // Create new task
      try {
        const res = await createTask({
          title: title.trim(),
          description: description.trim(),
          completed,
        });
        setTasks((prev) => [res.data, ...prev]);
        resetForm();
      } catch (err) {
        alert('Failed to create task: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCompleted(false);
    setEditingId(null);
  };

  const handleEditClick = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description || '');
    setCompleted(Boolean(task.completed));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      alert('Failed to delete task: ' + err.message);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className="tracker-container">
      {/* Header matching Image 1 */}
      <div className="tracker-header">
        <h1>Personal task tracker</h1>
        <p>Create, update, complete, and delete tasks stored in your own Express + MongoDB backend.</p>
      </div>

      {/* Form Card matching Image 1 */}
      <form onSubmit={handleSubmit} className="task-box">
        <div className="field-group">
          <label className="field-label">Task Title</label>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="field-input"
          />
        </div>

        <div className="field-group">
          <label className="field-label">Description</label>
          <textarea
            placeholder="Add details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="field-textarea"
          />
        </div>

        <label className="field-checkbox-wrap">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="field-checkbox"
          />
          <span>Mark as completed</span>
        </label>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Task' : 'Add Task'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="btn btn-outline">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Task List matching Image 1 */}
      <div className="tasks-list">
        {loading && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading tasks...</p>}

        {!loading && tasks.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            No tasks yet. Add your first task above.
          </p>
        )}

        {!loading &&
          tasks.map((task) => (
            <div key={task._id} className={`task-item ${task.completed ? 'done' : ''}`}>
              <div className="task-item-top">
                <div className="task-item-title">{task.title}</div>
                <span className={`status-badge ${task.completed ? 'completed' : ''}`}>
                  {task.completed ? 'Completed' : 'Open'}
                </span>
              </div>

              {task.description && <p className="task-item-desc">{task.description}</p>}

              <div className="task-item-date">{formatDate(task.createdAt)}</div>

              <div className="task-item-actions">
                <button
                  type="button"
                  onClick={() => handleEditClick(task)}
                  className="btn btn-edit"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TasksManager;
