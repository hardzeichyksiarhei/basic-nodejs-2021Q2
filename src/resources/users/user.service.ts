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
 * @param payload The task object for create
 * @returns The task object
 */
const create = async (payload: IBaseUser): Promise<IUser> => User.create(payload);

/**
 * Gets all users
 * @returns The users array
 */
const getAll = async (): Promise<IUser[]> => User.getAll();

/**
 * Gets a single user by its id field
 * @param id The id of the user
 * @returns The user object or null
 */
const getById = async (id: string = ''): Promise<IUser | null> => User.getById(id);

/**
 * Updates a single user by its id field
 * @param id The id of the user
 * @param payload The user object for update
 * @returns The user object or null
 */
const updateById = async (id: string = '', payload: IBaseUserPartial): Promise<IUser | null> =>
  User.updateById(id, payload);

/**
 * Deletes a single user by its id field
 * @param id The id of the user
 * @returns The user object or null
 */
const deleteById = async (id: string = ''): Promise<IUser | null> => {
  const userDeleted = await User.deleteById(id);

  if (userDeleted) {
    const tasks = await Task.findAll((task) => task.userId === userDeleted.id);
    tasks.forEach((task) => Task.updateById(task.id, { userId: null }));
  }

  return userDeleted;
};

export default { create, getAll, getById, updateById, deleteById };
