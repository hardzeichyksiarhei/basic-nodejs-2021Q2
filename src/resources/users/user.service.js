const User = require('./user.model');

const create = async (payload) => User.create(payload);

const getAll = () => User.getAll();

const getById = (id) => User.getById(id);

const updateById = async (id, payload) => User.updateById(id, payload);

const deleteById = async (id) => User.deleteById(id);

module.exports = { create, getAll, getById, updateById, deleteById };
