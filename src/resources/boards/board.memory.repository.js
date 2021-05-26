/**
 * @file   This file define the boards memory repository
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Boards
 */

const boards = require('../../data/boards');

/**
 * Adds an board object to the end of the boards collection
 * @param {TBoard} task The board to add in repository
 * @returns {Promise<TBoard>} The board who was added to the repository
 */
const add = async (board) => {
  boards.push(board);
  return board;
};

/**
 * Gets all boards
 * @returns {Promise<TBoard[]>} The boards array
 */
const all = async () => boards;

/**
 * Removes a single board by its id field
 * @param {TBoard} board The board object
 * @returns {?TBoard} The board object or null
 */
const remove = async ({ id }) => {
  const idx = boards.findIndex((board) => board.id === id);
  if (idx === -1) return null;
  const boardDeletable = boards[idx];
  boards.splice(idx, 1);
  return boardDeletable;
};

module.exports = { add, all, remove };
