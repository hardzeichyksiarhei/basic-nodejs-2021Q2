/**
 * @file   This file define the board services
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Boards
 */

const Board = require('./board.model');
const Column = require('../columns/column.model');
const Task = require('../tasks/task.model');

/**
 * Creates a board instance
 * @param {TBoard} payload The board object for create
 * @returns {Promise<TBoard>} The board object
 */
const create = async (payload) => {
  const boardCreatable = {
    ...payload,
    columns: payload.columns?.map(Column.createSync),
  };
  return Board.create(boardCreatable);
};

/**
 * Gets all boards
 * @returns {Promise<TBoard[]>} The boards array
 */
const getAll = () => Board.getAll();

/**
 * Gets a single board by its id field
 * @param {string} id The id of the board
 * @returns {Promise<?TBoard>} The board object or null
 */
const getById = (id) => Board.getById(id);

/**
 * Updates a single board by its id field
 * @param {string} id The id of the board
 * @param {TBoardUpdate} payload The board object for update
 * @returns {Promise<?TBoard>} The board object or null
 */
const updateById = async (id, payload) => {
  const boardUpdatable = {
    ...payload,
    columns: payload.columns?.map(Column.createSync),
  };
  return Board.updateById(id, boardUpdatable);
};

/**
 * Deletes a single board by its id field
 * @param {string} id The id of the board
 * @returns {Promise<?TBoard>} The board object or null
 */
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
