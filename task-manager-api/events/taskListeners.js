const taskEvents = require('./taskEvents');

// ==========================================
// PRACTICAL 10: ASYNCHRONOUS EVENT LISTENERS
// ==========================================

// Listener 1: Task Created Event Handler (Simulates Asynchronous Notification)
taskEvents.on('task-created', (data) => {
  const emitTimestamp = new Date().toISOString();
  console.log(`[Event Bus] Received 'task-created' event at ${emitTimestamp}`);

  // Simulate non-blocking async background work (e.g. sending email/push notification)
  setTimeout(() => {
    const processTimestamp = new Date().toISOString();
    const title = data.task ? data.task.title : 'Unknown Task';
    const user =
      data.user ? data.user.name || data.user.email : 'System/Anonymous';
    const priority = data.task ? data.task.priority || 'normal' : 'normal';

    console.log(`[NOTIFICATION SERVICE] Background task processed at ${processTimestamp}`);
    console.log(` ➜ Task Title: "${title}"`);
    console.log(` ➜ Priority Level: [${priority.toUpperCase()}]`);
    console.log(` ➜ Triggered By: User (${user})`);
    console.log(
      ` ➜ Execution Mode: Non-blocking background worker (Completed 1000ms after HTTP response)\n`
    );
  }, 1000);
});

// Listener 2: Task Updated Event Handler
taskEvents.on('task-updated', (data) => {
  setTimeout(() => {
    const processTimestamp = new Date().toISOString();
    const taskId = data.task ? data.task._id : 'N/A';
    const title = data.task ? data.task.title : 'Task';

    console.log(`[AUDIT SERVICE] Task updated event logged at ${processTimestamp}`);
    console.log(` ➜ Task ID: ${taskId}`);
    console.log(` ➜ Updated Title: "${title}"\n`);
  }, 500);
});

// Listener 3: Task Deleted Event Handler (Supplementary Problem)
taskEvents.on('task-deleted', (data) => {
  setTimeout(() => {
    const processTimestamp = new Date().toISOString();
    console.log(`[AUDIT SERVICE] Task deletion processed at ${processTimestamp}`);
    console.log(` ➜ Task ID: ${data.taskId}`);
    console.log(` ➜ Status: Permanent DB Removal Confirmed\n`);
  }, 500);
});

// Listener 4: Error Event Handler to prevent unhandled crash
taskEvents.on('error', (err) => {
  console.error('[EVENT ERROR] Handled event failure:', err.message);
});

module.exports = taskEvents;
