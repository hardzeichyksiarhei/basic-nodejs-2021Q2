const users = require('../../data/users');

const add = async (user) => {
  users.push(user);
  return user;
};
const insert = async (user) => add(user);

const getAll = async () => users;
module.exports = { add, insert, getAll };
