const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const create = async (payload) => {
  const user = new User(payload);
  const userInserted = await usersRepo.insert(user);
  return userInserted;
};

const getAll = () => usersRepo.getAll();

module.exports = { create, getAll };
