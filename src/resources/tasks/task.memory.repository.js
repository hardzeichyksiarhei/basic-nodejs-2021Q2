/**
 * @file   This file define the tasks memory repository
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Tasks
 */

const tasks = require('../../data/tasks');

/**
 * Adds an task object to the end of the tasks collection
 * @param {TTask} task The task to add in repository
 * @returns {Promise<TTask>} The task who was added to the repository
 */
const add = async (task) => {
  tasks.push(task);
  return task;
};

/**
 * Gets all tasks
 * @returns {Promise<TTask[]>} The tasks array
 */
const all = async () => tasks;

/**
 * Removes a single task by its id field
 * @param {TTask} task The task object
 * @returns {?TTask} The task object or null
 */
const remove = async ({ id }) => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return null;
  const taskDeletable = tasks[idx];
  tasks.splice(idx, 1);
  return taskDeletable;
};

module.exports = { add, all, remove };
