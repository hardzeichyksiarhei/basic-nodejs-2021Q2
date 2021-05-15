const boards = require('../../data/users');

const create = async (data) => {
  boards.push(data);
  return data;
};

const getAll = async () => boards;

const getById = async (id) => boards.find((board) => board.id === id);

// const updateById = async (id, data) => {};

// const deleteById = async (id) => {};

module.exports = { create, getAll, getById /* updateById, destroy */ };
