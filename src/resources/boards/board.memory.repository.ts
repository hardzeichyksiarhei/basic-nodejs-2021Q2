/**
 * @file   This file define the boards memory repository
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Boards
 */

import db from '../../db';

import { IBoard } from './board.interface';

const { boards } = db;

/**
 * Adds an board object to the end of the boards collection
 * @param {IBoard} task The board to add in repository
 * @returns {Promise<IBoard>} The board who was added to the repository
 */
const add = async (board: IBoard): Promise<IBoard> => {
  boards.push(board);
  return board;
};

/**
 * Gets all boards
 * @returns {Promise<TBoard[]>} The boards array
 */
const all = async (): Promise<IBoard[]> => boards;

/**
 * Removes a single board by its id field
 * @param {TBoard} board The board object
 * @returns {Promise<?TBoard>} The board object or null
 */
const remove = async ({ id }: IBoard): Promise<IBoard | null> => {
  const idx = boards.findIndex((board) => board.id === id);
  if (idx === -1) return null;
  const boardDeletable = boards[idx]!;
  boards.splice(idx, 1);
  return boardDeletable;
};

export default { add, all, remove };
