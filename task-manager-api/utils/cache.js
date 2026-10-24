const NodeCache = require('node-cache');

// Initialize NodeCache instance with standard TTL of 60 seconds
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Cache metrics counter for analysis and debugging (Practical 9)
let metrics = {
  hits: 0,
  misses: 0,
  invalidations: 0,
};

const recordHit = () => {
  metrics.hits++;
};

const recordMiss = () => {
  metrics.misses++;
};

const invalidateTaskCache = (taskId = null) => {
  // Invalidate the primary all_tasks list cache
  cache.del('all_tasks');
  metrics.invalidations++;

  // If a specific task ID is provided, invalidate its individual cache key
  if (taskId) {
    cache.del(`task_${taskId}`);
  } else {
    // Clear all single task caches
    const keys = cache.keys();
    keys.forEach((key) => {
      if (key.startsWith('task_')) {
        cache.del(key);
      }
    });
  }
};

const getMetrics = () => {
  const totalRequests = metrics.hits + metrics.misses;
  const hitRate =
    totalRequests > 0
      ? ((metrics.hits / totalRequests) * 100).toFixed(2) + '%'
      : '0%';

  return {
    hits: metrics.hits,
    misses: metrics.misses,
    invalidations: metrics.invalidations,
    hitRate,
    activeKeys: cache.keys(),
    nodeCacheStats: cache.getStats(),
  };
};

module.exports = {
  cache,
  recordHit,
  recordMiss,
  invalidateTaskCache,
  getMetrics,
};
