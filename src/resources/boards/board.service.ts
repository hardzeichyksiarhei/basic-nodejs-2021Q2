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

import { IBoard, IBaseBoard, IBaseBoardPartial } from './board.interface';

/**
 * Creates a board instance
 * @param payload The board object for create
 * @returns The board object
 */
const create = async (payload: IBaseBoard): Promise<IBoard> => {
  const boardCreatable = {
    ...payload,
    columns: payload.columns?.map(Column.createSync),
  };
  return Board.create(boardCreatable);
};

/**
 * Gets all boards
 * @returns The boards array
 */
const getAll = (): Promise<IBoard[]> => Board.getAll();

/**
 * Gets a single board by its id field
 * @param id The id of the board
 * @returns The board object or null
 */
const getById = (id: string): Promise<IBoard | null> => Board.getById(id);

/**
 * Updates a single board by its id field
 * @param id The id of the board
 * @param payload The board object for update
 * @returns The board object
 */
const updateById = async (id: string, payload: IBaseBoardPartial): Promise<IBoard | null> => {
  const boardUpdatable = {
    ...payload,
    columns: payload.columns?.map(Column.createSync),
  };
  return Board.updateById(id, boardUpdatable);
};

/**
 * Deletes a single board by its id field
 * @param id The id of the board
 * @returns The board object or null
 */
const deleteById = async (id: string): Promise<IBoard | null> => {
  const boardDeleted = await Board.deleteById(id);

  if (boardDeleted) {
    const tasks = await Task.findAll((task) => task.boardId === boardDeleted.id);
    tasks.forEach((task) => Task.updateById(task.id, { boardId: null }));
  }

  return boardDeleted;
};

export default { create, getAll, getById, updateById, deleteById };
