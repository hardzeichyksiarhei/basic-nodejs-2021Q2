const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

const usersRepo = require('./user.memory.repository');

class User {
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

  static async create(payload) {
    const user = new User(payload);
    const userInserted = await usersRepo.insert(user);
    return userInserted;
  }

  static async getAll(id) {
    const users = await usersRepo.getAll(id);
    return users;
  }

  static async getById(id) {
    const user = await usersRepo.getById(id);
    return user;
  }

  static async updateById(id, payload) {
    const user = await usersRepo.getById(id);
    const userUpdated = user?.update(payload);
    return userUpdated;
  }

  async update(payload) {
    const { name, login, password } = payload;
    if (name) this.name = name;
    if (login) this.login = login;
    if (password) this.password = bcrypt.hashSync(password, 10);

    return this;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  static async deleteById(id) {
    const user = await usersRepo.deleteById(id);
    return user;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
