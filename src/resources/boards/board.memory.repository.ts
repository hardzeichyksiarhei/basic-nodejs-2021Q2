/**
 * @file   This file define the boards memory repository
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Boards
 */

import db from '../../db';

import { TBoard } from './board.type';

const { boards } = db;

/**
 * Adds an board object to the end of the boards collection
 * @param {TBoard} task The board to add in repository
 * @returns {Promise<TBoard>} The board who was added to the repository
 */
const add = async (board: TBoard): Promise<TBoard> => {
  boards.push(board);
  return board;
};

/**
 * Gets all boards
 * @returns {Promise<TBoard[]>} The boards array
 */
const all = async (): Promise<TBoard[]> => boards;

/**
 * Removes a single board by its id field
 * @param {TBoard} board The board object
 * @returns {Promise<?TBoard>} The board object or null
 */
const remove = async ({ id }: TBoard): Promise<TBoard | null> => {
  const idx = boards.findIndex((board) => board.id === id);
  if (idx === -1) return null;
  const boardDeletable = boards[idx]!;
  boards.splice(idx, 1);
  return boardDeletable;
};

export default { add, all, remove };
