const users = require('../../data/users');

const add = async (user) => {
  users.push(user);
  return user;
};
const insert = async (user) => add(user);

const getAll = async () => users;

const getById = async (id) => users.find((user) => user.id === id);

module.exports = { add, insert, getAll, getById };
