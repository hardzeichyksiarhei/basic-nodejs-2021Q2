/**
 * @file   This file define the task services
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Tasks
 */

const Task = require('./task.model');

/**
 * Creates a task instance
 * @param {TTask} payload The task object for create
 * @returns {Promise<TTask>} The task object
 */
const create = async (boardId, payload) => {
  const taskCreatable = { ...payload, boardId };
  return Task.create(taskCreatable);
};

/**
 * Gets all tasks by its boardId and taskId fields
 * @param {string} boardId The id of the board
 * @returns {Promise<TTask[]>} The tasks array
 */
const getAllByBoardId = async (boardId) => Task.getAllByBoardId(boardId);

/**
 * Gets a single task by its boardId and taskId fields
 * @param {string} boardId The id of the board
 * @param {string} taskId The id of the task
 * @returns {Promise<?TTask>} The task object or null
 */
const getByBoardIdAndTaskId = async (boardId, taskId) =>
  Task.getByBoardIdAndTaskId(boardId, taskId);

/**
 * Updates a single task by boardId and taskId fields
 * @param {string} boardId The id of the board
 * @param {string} taskId The id of the task
 * @param {TTaskUpdate} payload The task object for update
 * @returns {Promise<?TTask>} The task object or null
 */
const updateByBoardIdAndTaskId = async (boardId, taskId, payload) =>
  Task.updateByBoardIdAndTaskId(boardId, taskId, payload);

/**
 * Deletes a single task by boardId and taskId fields
 * @param {string} boardId The id of the board
 * @param {string} taskId The id of the task
 * @returns {Promise<?TTask>} The task object or null
 */
const deleteByBoardIdAndTaskId = async (boardId, taskId) =>
  Task.deleteByBoardIdAndTaskId(boardId, taskId);

module.exports = {
  create,
  getAllByBoardId,
  getByBoardIdAndTaskId,
  updateByBoardIdAndTaskId,
  deleteByBoardIdAndTaskId,
};
