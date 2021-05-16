const User = require('./user.model');
const Task = require('../tasks/task.model');

const create = async (payload) => User.create(payload);

const getAll = () => User.getAll();

const getById = (id) => User.getById(id);

const updateById = async (id, payload) => User.updateById(id, payload);

const deleteById = async (id) => {
  const userDeleted = await User.deleteById(id);

  if (userDeleted && userDeleted.id) {
    const tasks = await Task.findAll((task) => task.userId === userDeleted.id);
    tasks.forEach((task) => Task.updateById(task.id, { userId: null }));
  }

  return userDeleted;
};

module.exports = { create, getAll, getById, updateById, deleteById };
