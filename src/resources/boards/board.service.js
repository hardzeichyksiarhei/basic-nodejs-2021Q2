const Board = require('./board.model');
const Column = require('../columns/column.model');
const Task = require('../tasks/task.model');

const create = async (payload) => {
  const boardCreatable = {
    ...payload,
    columns: payload.columns?.map(Column.createSync),
  };
  return Board.create(boardCreatable);
};

const getAll = () => Board.getAll();

const getById = (id) => Board.getById(id);

const updateById = async (id, payload) => {
  const boardUpdatable = {
    ...payload,
    columns: payload.columns?.map(Column.createSync),
  };
  return Board.updateById(id, boardUpdatable);
};

const deleteById = async (id) => {
  const boardDeleted = await Board.deleteById(id);

  if (boardDeleted && boardDeleted.id) {
    const tasks = await Task.findAll(
      (task) => task.boardId === boardDeleted.id
    );
    tasks.forEach((task) => Task.updateById(task.id, { boardId: null }));
  }

  return boardDeleted;
};

module.exports = { create, getAll, getById, updateById, deleteById };
