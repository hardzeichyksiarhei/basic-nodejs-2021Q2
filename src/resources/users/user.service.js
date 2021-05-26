/**
 * @file   This file define the user services
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Users
 */

const User = require('./user.model');
const Task = require('../tasks/task.model');

/**
 * Creates a task instance
 * @param {TTask} payload The task object for create
 * @returns {Promise<TTask>} The task object
 */
const create = async (payload) => User.create(payload);

/**
 * Gets all users
 * @returns {Promise<TUser[]>} The users array
 */
const getAll = async () => User.getAll();

/**
 * Gets a single user by its id field
 * @param {string} id The id of the user
 * @returns {Promise<?TUser>} The user object or null
 */
const getById = async (id) => User.getById(id);

/**
 * Updates a single user by its id field
 * @param {string} id The id of the user
 * @param {TUserUpdate} payload The user object for update
 * @returns {Promise<?TUser>} The user object or null
 */
const updateById = async (id, payload) => User.updateById(id, payload);

/**
 * Deletes a single user by its id field
 * @param {string} id The id of the user
 * @returns {Promise<?TUser>} The user object or null
 */
const deleteById = async (id) => {
  const userDeleted = await User.deleteById(id);

  if (userDeleted && userDeleted.id) {
    const tasks = await Task.findAll((task) => task.userId === userDeleted.id);
    tasks.forEach((task) => Task.updateById(task.id, { userId: null }));
  }

  return userDeleted;
};

module.exports = { create, getAll, getById, updateById, deleteById };
