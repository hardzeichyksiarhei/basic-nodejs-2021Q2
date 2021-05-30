/**
 * @file   This file define the User class
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Users
 */
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import usersRepo from './user.memory.repository';

import { IUser, IBaseUser, IBaseUserPartial, IBaseUserResponse } from './user.interface';

/** Class representing a User model */
class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * Creates a user instance
   * @param user The user object
   */
  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' }: IBaseUserPartial = {}) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = bcrypt.hashSync(password, 10);
  }

  /**
   * Creates a user instance and adds to the collection
   * @param payload The user object for create
   * @returns The user object
   */
  static async create(payload: IBaseUser): Promise<IUser> {
    const user = new User(payload);
    const userAdded = await usersRepo.add(user);
    return userAdded;
  }

  /**
   * Gets all users
   * @returns The users array
   */
  static async getAll(): Promise<IUser[]> {
    const users = await usersRepo.all();
    return users;
  }

  /**
   * Gets a single user by its id field
   * @param id The id of the user
   * @returns The user object or null
   */
  static async getById(id: string): Promise<IUser | null> {
    const users = await usersRepo.all();
    const idx = users.findIndex((user) => user.id === id);
    if (idx === -1) return null;
    return users[idx]!;
  }

  /**
   * Updates a single user by its id field
   * @param id The id of the user
   * @param payload The user object for update
   * @returns The user object or null
   */
  static async updateById(id: string, payload: IBaseUserPartial): Promise<IUser | null> {
    const user = await User.getById(id);
    if (!user) return null;
    return user.update(payload);
  }

  /**
   * Updates a user
   * @param payload The user object for update
   * @returns The user object
   */
  async update(payload: IBaseUserPartial): Promise<IUser> {
    const { name, login, password } = payload;
    if (name !== undefined) this.name = name;
    if (login !== undefined) this.login = login;
    if (password !== undefined) this.password = bcrypt.hashSync(password, 10);

    return this;
  }

  /**
   * Deletes a single user by its id field
   * @param id The id of the user
   * @returns The user object or null
   */
  static async deleteById(id: string): Promise<IUser | null> {
    const user = await User.getById(id);
    if (!user) return null;
    return usersRepo.remove(user);
  }

  /**
   * Gets a single user for API response
   * @param user The user object
   * @returns The user object for response
   */
  static toResponse(user: IUser): IBaseUserResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
