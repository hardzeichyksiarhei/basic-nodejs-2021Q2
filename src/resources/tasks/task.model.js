/**
 * @file   This file define the Task class
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Tasks
 */

const { v4: uuid } = require('uuid');

const tasksRepo = require('./task.memory.repository');

/** Class representing a Task model */
class Task {
  /**
   * Creates a task instance
   * @param {TTask} task The task object
   */
  constructor({
    id = uuid(),
    title = 'TASK',
    order = -1,
    description = '',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Creates a task instance and adds to the tasks collection
   * @param {TTask} payload The task object for create
   * @returns {Promise<TTask>} The task object
   */
  static async create(payload) {
    const task = new Task(payload);
    const taskAdded = await tasksRepo.add(task);
    return taskAdded;
  }

  /**
   * Gets a single task by its id field
   * @param {string} id The id of the task
   * @returns {Promise<?TTask>} The task object or null
   */
  static async getById(id) {
    const tasks = await tasksRepo.all();
    const idx = tasks.findIndex((task) => task.id === id);
    if (idx === -1) return null;
    return tasks[idx];
  }

  /**
   * Gets all tasks by its boardId and taskId fields
   * @param {string} boardId The id of the board
   * @returns {Promise<TTask[]>} The tasks array
   */
  static async getAllByBoardId(boardId) {
    const tasks = await tasksRepo.all();
    return tasks.filter((task) => task.boardId === boardId);
  }

  /**
   * Gets a single task by its boardId and taskId fields
   * @param {string} boardId The id of the board
   * @param {string} taskId The id of the task
   * @returns {Promise<?TTask>} The task object or null
   */
  static async getByBoardIdAndTaskId(boardId, taskId) {
    const tasks = await tasksRepo.all();
    const idx = tasks.findIndex(
      (task) => task.boardId === boardId && task.id === taskId
    );
    if (idx === -1) return null;
    return tasks[idx];
  }

  /**
   * Updates a single task by its id field
   * @param {string} id The id of the task
   * @param {TTaskUpdate} payload The task object for update
   * @returns {Promise<?TTask>} The task object or null
   */
  static async updateById(id, payload) {
    const task = await Task.getById(id);
    if (!task) return null;
    return task.update(payload);
  }

  /**
   * Updates a single task by boardId and taskId fields
   * @param {string} boardId The id of the board
   * @param {string} taskId The id of the task
   * @param {TTaskUpdate} payload The task object for update
   * @returns {Promise<?TTask>} The task object or null
   */
  static async updateByBoardIdAndTaskId(boardId, taskId, payload) {
    const task = await Task.getByBoardIdAndTaskId(boardId, taskId);
    if (!task) return null;
    return task.update(payload);
  }

  /**
   * Updates a task
   * @param {TTaskUpdate} payload The task object for update
   * @returns {Promise<TTask>} The task object
   */
  async update(payload) {
    const { title, order, description, userId, boardId, columnId } = payload;
    if (title !== undefined) this.title = title;
    if (order !== undefined) this.order = order;
    if (description !== undefined) this.description = description;
    if (userId !== undefined) this.userId = userId;
    if (boardId !== undefined) this.boardId = boardId;
    if (columnId !== undefined) this.columnId = columnId;

    return this;
  }

  /**
   * Retrieves all the elements that match the conditions defined by the specified predicate
   * @param {Function} callback The predicate that defines the conditions of the elements to search for
   * @returns {Promise<TTask>} A array containing all the elements that match the conditions defined by the specified predicate, if found; otherwise, an empty array
   */
  static async findAll(callback) {
    if (typeof callback !== 'function') return null;
    const tasks = await tasksRepo.all();
    return tasks.filter(callback);
  }

  /**
   * Deletes a single task by boardId and taskId fields
   * @param {string} boardId The id of the board
   * @param {string} taskId The id of the task
   * @returns {Promise<?TTask>} The task object or null
   */
  static async deleteByBoardIdAndTaskId(boardId, taskId) {
    const task = await Task.getByBoardIdAndTaskId(boardId, taskId);
    if (!task) return null;
    return tasksRepo.remove(task);
  }

  /**
   * Gets a single task for API response
   * @param {TTask} task The task object
   * @returns {TTask} The task object for response
   */
  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
