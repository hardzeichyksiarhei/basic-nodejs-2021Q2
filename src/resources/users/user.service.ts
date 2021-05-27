/**
 * @file   This file define the user services
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Users
 */

import User from './user.model';
import { TUser } from './user.type';

import Task from '../tasks/task.model';

/**
 * Creates a user instance
 * @param {TUser} payload The task object for create
 * @returns {Promise<TUser>} The task object
 */
const create = async (payload: TUser): Promise<TUser> => User.create(payload);

/**
 * Gets all users
 * @returns {Promise<TUser[]>} The users array
 */
const getAll = async (): Promise<TUser[]> => User.getAll();

/**
 * Gets a single user by its id field
 * @param {string} id The id of the user
 * @returns {Promise<TUser | null>} The user object
 */
const getById = async (id: string): Promise<TUser | null> => User.getById(id);

/**
 * Updates a single user by its id field
 * @param {string} id The id of the user
 * @param {TUser} payload The user object for update
 * @returns {Promise<TUser | null>} The user object
 */
const updateById = async (id: string, payload: TUser): Promise<TUser | null> =>
  User.updateById(id, payload);

/**
 * Deletes a single user by its id field
 * @param {string} id The id of the user
 * @returns {Promise<?TUser>} The user object or null
 */
const deleteById = async (id: string): Promise<TUser | null> => {
  const userDeleted = await User.deleteById(id);

  if (userDeleted) {
    const tasks = await Task.findAll((task) => task.userId === userDeleted.id);
    tasks.forEach((task) => Task.updateById(task.id, { userId: null }));
  }

  return userDeleted;
};

export default { create, getAll, getById, updateById, deleteById };
