const { v4: uuid } = require('uuid');

const boardsRepo = require('./board.memory.repository');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static async create(payload) {
    const board = new Board(payload);
    const boardInserted = await boardsRepo.insert(board);
    return boardInserted;
  }

  static async getAll(id) {
    const boards = await boardsRepo.getAll(id);
    return boards;
  }

  static async getById(id) {
    const board = await boardsRepo.getById(id);
    return board;
  }

  static async updateById(id, payload) {
    const board = await boardsRepo.getById(id);
    const boardUpdated = board?.update(payload);
    return boardUpdated;
  }

  async update(payload) {
    const { title, columns } = payload;
    if (title) this.title = title;
    if (columns) this.columns = columns;

    return this;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  static async deleteById(id) {
    const board = await boardsRepo.deleteById(id);
    return board;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
