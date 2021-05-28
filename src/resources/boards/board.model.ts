/**
 * @file   This file define the Board class
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Boards
 */

import { v4 as uuid } from 'uuid';

import boardsRepo from './board.memory.repository';

import { IColumn } from '../columns/column.type';
import { IBoard, IBaseBoardPartial, IBaseBoard, IBaseBoardResponse } from './board.interface';

/** Class representing a Board model */
class Board implements IBoard {
  id: string;

  title: string;

  columns: IColumn[];

  /**
   * Creates a board instance
   * @param {IBaseBoardPartial} board The board object
   */
  constructor({ title = 'BOARD', columns = [] }: IBaseBoardPartial = {}) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }

  /**
   * Creates a board instance and adds to the collection
   * @param {IBaseBoard} payload The board object for create
   * @returns {Promise<IBoard>} The board object
   */
  static async create(payload: IBaseBoard): Promise<IBoard> {
    const board = new Board(payload);
    const boardAdded = await boardsRepo.add(board);
    return boardAdded;
  }

  /**
   * Gets all boards
   * @returns {Promise<IBoard[]>} The boards array
   */
  static async getAll(): Promise<IBoard[]> {
    const boards = await boardsRepo.all();
    return boards;
  }

  /**
   * Gets a single board by its id field
   * @param {string} id The id of the board
   * @returns {Promise<?IBoard>} The board object or null
   */
  static async getById(id: string): Promise<IBoard | null> {
    const boards = await boardsRepo.all();
    const idx = boards.findIndex((board) => board.id === id);
    if (idx === -1) return null;
    return boards[idx]!;
  }

  /**
   * Updates a single board by its id field
   * @param {string} id The id of the board
   * @param {IBaseBoardPartial} payload The board object for update
   * @returns {Promise<?IBoard>} The board object or null
   */
  static async updateById(id: string, payload: IBaseBoardPartial): Promise<IBoard | null> {
    const board = await Board.getById(id);
    if (!board) return null;
    return board.update(payload);
  }

  /**
   * Updates a board
   * @param {IBaseBoardPartial} payload The board object for update
   * @returns {Promise<IBoard>} The board object
   */
  async update(payload: IBaseBoardPartial): Promise<IBoard> {
    const { title, columns } = payload;
    if (title !== undefined) this.title = title;
    if (columns !== undefined) this.columns = columns;

    return this;
  }

  /**
   * Deletes a single board by its id field
   * @param {string} id The id of the board
   * @returns {Promise<?IBoard>} The board object or null
   */
  static async deleteById(id: string): Promise<IBoard | null> {
    const board = await Board.getById(id);
    if (!board) return null;
    return boardsRepo.remove(board);
  }

  /**
   * Gets a single board for API response
   * @param {IBoard} user The board object
   * @returns {IBoard} The board object for response
   */
  static toResponse(board: IBoard): IBaseBoardResponse {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
