const EventEmitter = require('events');

// Create a custom TaskEvents class inheriting from Node.js native EventEmitter
class TaskEvents extends EventEmitter {}

// Export a singleton instance of TaskEvents to be shared across the backend application
const taskEvents = new TaskEvents();

module.exports = taskEvents;
