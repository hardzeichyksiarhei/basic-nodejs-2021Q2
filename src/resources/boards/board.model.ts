/**
 * @file   This file define the Board class
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Boards
 */

import { v4 as uuid } from 'uuid';

import boardsRepo from './board.memory.repository';

import { TColumn } from '../columns/column.type';
import { TBoard, TBoardConstructor, TBoardUpdate } from "./board.type";

interface IBoard {
  id: string;
  title: string;
  columns: TColumn[];

  update(payload: TBoardUpdate): Promise<TBoard>;
}

/** Class representing a Board model */
class Board implements IBoard {
  id: string;

  title: string;

  columns: TColumn[];

  /**
   * Creates a board instance
   * @param {TBoard} board The board object
   */
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [],
  }: TBoardConstructor = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Creates a board instance and adds to the collection
   * @param {TBoard} payload The board object for create
   * @returns {Promise<TBoard>} The board object
   */
  static async create(payload: TBoard): Promise<TBoard> {
    const board = new Board(payload);
    const boardAdded = await boardsRepo.add(board);
    return boardAdded;
  }

  /**
   * Gets all boards
   * @returns {Promise<TBoard[]>} The boards array
   */
  static async getAll(): Promise<TBoard[]> {
    const boards = await boardsRepo.all();
    return boards;
  }

  /**
   * Gets a single board by its id field
   * @param {string} id The id of the board
   * @returns {Promise<?TBoard>} The board object or null
   */
  static async getById(id: string): Promise<TBoard | null> {
    const boards = await boardsRepo.all();
    const idx = boards.findIndex((board) => board.id === id);
    if (idx === -1) return null;
    return boards[idx]!;
  }

  /**
   * Updates a single board by its id field
   * @param {string} id The id of the board
   * @param {TBoardUpdate} payload The board object for update
   * @returns {Promise<?TBoard>} The board object or null
   */
  static async updateById(
    id: string,
    payload: TBoardUpdate
  ): Promise<TBoard | null> {
    const board = await Board.getById(id);
    if (!board) return null;
    return (board as IBoard).update(payload);
  }

  /**
   * Updates a board
   * @param {TBoard} payload The board object for update
   * @returns {Promise<TBoard>} The board object
   */
  async update(payload: TBoard): Promise<TBoard> {
    const { title, columns } = payload;
    if (title !== undefined) this.title = title;
    if (columns !== undefined) this.columns = columns;

    return this;
  }

  /**
   * Deletes a single board by its id field
   * @param {string} id The id of the board
   * @returns {Promise<?TBoard>} The board object or null
   */
  static async deleteById(id: string): Promise<TBoard | null> {
    const board = await Board.getById(id);
    if (!board) return null;
    return boardsRepo.remove(board);
  }

  /**
   * Gets a single board for API response
   * @param {TBoard} user The board object
   * @returns {TBoard} The board object for response
   */
  static toResponse(board: TBoard): TBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
