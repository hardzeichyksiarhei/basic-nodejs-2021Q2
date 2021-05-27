/**
 * @file   This file define the User class
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Users
 */

const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

const usersRepo = require('./user.memory.repository');

/** Class representing a User model */
class User {
  /**
   * Creates a user instance
   * @param {TUser} user The user object
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = bcrypt.hashSync(password, 10);
  }

  /**
   * Creates a user instance and adds to the collection
   * @param {TUser} payload The user object for create
   * @returns {Promise<TUser>} The user object
   */
  static async create(payload) {
    const user = new User(payload);
    const userAdded = await usersRepo.add(user);
    return userAdded;
  }

  /**
   * Gets all users
   * @returns {Promise<TUser[]>} The users array
   */
  static async getAll() {
    const users = await usersRepo.all();
    return users;
  }

  /**
   * Gets a single user by its id field
   * @param {string} id The id of the user
   * @returns {Promise<?TUser>} The user object or null
   */
  static async getById(id) {
    const users = await usersRepo.all();
    const idx = users.findIndex((user) => user.id === id);
    if (idx === -1) return null;
    return users[idx];
  }

  /**
   * Updates a single user by its id field
   * @param {string} id The id of the user
   * @param {TUserUpdate} payload The user object for update
   * @returns {Promise<?TUser>} The user object or null
   */
  static async updateById(id, payload) {
    const user = await User.getById(id);
    if (!user) return null;
    return user.update(payload);
  }

  /**
   * Updates a user
   * @param {TUserUpdate} payload The user object for update
   * @returns {Promise<TUser>} The user object
   */
  async update(payload) {
    const { name, login, password } = payload;
    if (name !== undefined) this.name = name;
    if (login !== undefined) this.login = login;
    if (password !== undefined) this.password = bcrypt.hashSync(password, 10);

    return this;
  }

  /**
   * Deletes a single user by its id field
   * @param {string} id The id of the user
   * @returns {Promise<?TUser>} The user object or null
   */
  static async deleteById(id) {
    const user = await User.getById(id);
    if (!user) return null;
    return usersRepo.remove(user);
  }

  /**
   * Gets a single user for API response
   * @param {TUser} user The user object
   * @returns {TUserResponse} The user object for response
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
