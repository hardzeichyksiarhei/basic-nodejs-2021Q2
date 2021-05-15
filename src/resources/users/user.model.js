const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

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

  update(payload) {
    const { name, login, password } = payload;
    if (name) this.name = name;
    if (login) this.login = login;
    if (password) this.password = bcrypt.hashSync(password, 10);
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
