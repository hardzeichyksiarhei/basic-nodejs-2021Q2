/**
 * @file   This file define the user services
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Users
 */

import User from './user.model';
import { IUser, IBaseUser, IBaseUserPartial } from './user.interface';

import Task from '../tasks/task.model';

/**
 * Creates a user instance
 * @param {IBaseUser} payload The task object for create
 * @returns {Promise<IUser>} The task object
 */
const create = async (payload: IBaseUser): Promise<IUser> => User.create(payload);

/**
 * Gets all users
 * @returns {Promise<IUser[]>} The users array
 */
const getAll = async (): Promise<IUser[]> => User.getAll();

/**
 * Gets a single user by its id field
 * @param {string} id The id of the user
 * @returns {Promise<IUser | null>} The user object
 */
const getById = async (id: string): Promise<IUser | null> => User.getById(id);

/**
 * Updates a single user by its id field
 * @param {string} id The id of the user
 * @param {IBaseUserPartial} payload The user object for update
 * @returns {Promise<IUser | null>} The user object
 */
const updateById = async (id: string, payload: IBaseUserPartial): Promise<IUser | null> =>
  User.updateById(id, payload);

/**
 * Deletes a single user by its id field
 * @param {string} id The id of the user
 * @returns {Promise<?IUser>} The user object or null
 */
const deleteById = async (id: string): Promise<IUser | null> => {
  const userDeleted = await User.deleteById(id);

  if (userDeleted) {
    const tasks = await Task.findAll((task) => task.userId === userDeleted.id);
    tasks.forEach((task) => Task.updateById(task.id, { userId: null }));
  }

  return userDeleted;
};

export default { create, getAll, getById, updateById, deleteById };
