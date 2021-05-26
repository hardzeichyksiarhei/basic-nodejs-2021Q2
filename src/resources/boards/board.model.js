/**
 * @file   This file define the Board class
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Boards
 */

const { v4: uuid } = require('uuid');

const boardsRepo = require('./board.memory.repository');

/** Class representing a Board model */
class Board {
  /**
   * Creates a board instance
   * @param {TBoard} board The board object
   */
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Creates a board instance and adds to the collection
   * @param {TBoard} payload The board object for create
   * @returns {Promise<TBoard>} The board object
   */
  static async create(payload) {
    const board = new Board(payload);
    const boardAdded = await boardsRepo.add(board);
    return boardAdded;
  }

  /**
   * Gets all boards
   * @returns {Promise<TBoard[]>} The boards array
   */
  static async getAll() {
    const boards = await boardsRepo.all();
    return boards;
  }

  /**
   * Gets a single board by its id field
   * @param {string} id The id of the board
   * @returns {Promise<TBoard>} The board object
   */
  static async getById(id) {
    const boards = await boardsRepo.all();
    const idx = boards.findIndex((board) => board.id === id);
    if (idx === -1) return null;
    return boards[idx];
  }

  /**
   * Updates a single board by its id field
   * @param {string} id The id of the board
   * @param {TBoard} payload The board object for update
   * @returns {Promise<TBoard>} The board object
   */
  static async updateById(id, payload) {
    const board = await Board.getById(id);
    if (!board) return null;
    return board.update(payload);
  }

  /**
   * Updates a board
   * @param {TBoard} payload The board object for update
   * @returns {Promise<TBoard>} The board object
   */
  async update(payload) {
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
  static async deleteById(id) {
    const board = await Board.getById(id);
    if (!board) return null;
    return boardsRepo.remove(board);
  }

  /**
   * Gets a single board for API response
   * @param {TBoard} user The board object
   * @returns {TBoard} The board object for response
   */
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
