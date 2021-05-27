/**
 * @file   This file define the board services
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Boards
 */

import Board from './board.model';
import Column from '../columns/column.model';
import Task from '../tasks/task.model';

import { TBoard } from './board.type';

/**
 * Creates a board instance
 * @param {TBoard} payload The board object for create
 * @returns {Promise<TBoard>} The board object
 */
const create = async (payload: TBoard): Promise<TBoard> => {
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
const getAll = (): Promise<TBoard[]> => Board.getAll();

/**
 * Gets a single board by its id field
 * @param {string} id The id of the board
 * @returns {Promise<?TBoard>} The board object or null
 */
const getById = (id: string): Promise<TBoard | null> => Board.getById(id);

/**
 * Updates a single board by its id field
 * @param {string} id The id of the board
 * @param {TBoard} payload The board object for update
 * @returns {Promise<?TBoard>} The board object
 */
const updateById = async (
  id: string,
  payload: TBoard
): Promise<TBoard | null> => {
  const boardUpdatable = {
    ...payload,
    columns: payload.columns.map(Column.createSync),
  };
  return Board.updateById(id, boardUpdatable);
};

/**
 * Deletes a single board by its id field
 * @param {string} id The id of the board
 * @returns {Promise<?TBoard>} The board object or null
 */
const deleteById = async (id: string): Promise<TBoard | null> => {
  const boardDeleted = await Board.deleteById(id);

  if (boardDeleted) {
    const tasks = await Task.findAll(
      (task) => task.boardId === boardDeleted.id
    );
    tasks.forEach((task) => Task.updateById(task.id, { boardId: null }));
  }

  return boardDeleted;
};

export default { create, getAll, getById, updateById, deleteById };
