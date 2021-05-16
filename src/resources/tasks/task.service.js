const Task = require('./task.model');

const create = async (payload) => Task.create(payload);

const getAll = () => Task.getAll();

const getById = (id) => Task.getById(id);

const updateById = async (id, payload) => Task.updateById(id, payload);

const deleteById = async (id) => Task.deleteById(id);

module.exports = { create, getAll, getById, updateById, deleteById };
