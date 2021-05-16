const boards = require('../../data/boards');

const add = async (board) => {
  boards.push(board);
  return board;
};

const insert = async (board) => add(board);

const getAll = async () => boards;

const getById = async (id) => boards.find((board) => board.id === id);

const deleteById = async (id) => {
  const idx = boards.findIndex((board) => board.id === id);
  if (idx === -1) return null;
  const boardDeletable = boards[idx];
  boards.splice(idx, 1);
  return boardDeletable;
};

module.exports = { add, insert, getAll, getById, deleteById };
