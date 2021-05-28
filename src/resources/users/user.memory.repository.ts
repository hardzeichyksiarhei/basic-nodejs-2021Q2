/**
 * @file   This file define the users memory repository
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Users
 */

import db from '../../db';

import { IUser } from './user.interface';

const { users } = db;

/**
 * Adds an user object to the end of the users collection
 * @param {IUser} user The user to add in repository
 * @returns {Promise<IUser>} The user who was added to the repository
 */
const add = async (user: IUser): Promise<IUser> => {
  users.push(user);
  return user;
};

/**
 * Gets all users
 * @returns {Promise<IUser[]>} The users array
 */
const all = async (): Promise<IUser[]> => users;

/**
 * Removes a single user by its id field
 * @param {TUser} user The user object
 * @returns {?TUser} The user object or null
 */
const remove = async ({ id }: IUser): Promise<IUser | null> => {
  const idx = users.findIndex((user) => user.id === id);
  if (idx === -1) return null;
  const userDeletable = users[idx]!;
  users.splice(idx, 1);
  return userDeletable;
};

export default { add, all, remove };
