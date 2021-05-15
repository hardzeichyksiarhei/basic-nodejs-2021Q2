const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const create = async (payload) => {
  const user = new User(payload);
  const userInserted = await usersRepo.insert(user);
  return userInserted;
};

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const updateById = async (id, payload) => usersRepo.updateById(id, payload);

const deleteById = async (id) => usersRepo.deleteById(id);

module.exports = { create, getAll, getById, updateById, deleteById };
