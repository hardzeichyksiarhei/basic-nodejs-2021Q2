/**
 * @file   This file define the users memory repository
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Users
 */

import db from '../../db';

import { TUser } from './user.type';

const { users } = db;

/**
 * Adds an user object to the end of the users collection
 * @param {TUser} user The user to add in repository
 * @returns {Promise<TUser>} The user who was added to the repository
 */
const add = async (user: TUser): Promise<TUser> => {
  users.push(user);
  return user;
};

/**
 * Gets all users
 * @returns {Promise<TUser[]>} The users array
 */
const all = async (): Promise<TUser[]> => users;

/**
 * Removes a single user by its id field
 * @param {TUser} user The user object
 * @returns {?TUser} The user object or null
 */
const remove = async ({ id }: TUser): Promise<TUser | null> => {
  const idx = users.findIndex((user) => user.id === id);
  if (idx === -1) return null;
  const userDeletable = users[idx]!;
  users.splice(idx, 1);
  return userDeletable;
};

export default { add, all, remove };
