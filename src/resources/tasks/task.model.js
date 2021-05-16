const { v4: uuid } = require('uuid');

const tasksRepo = require('./task.memory.repository');

class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = -1,
    description = '',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static async create(payload) {
    const task = new Task(payload);
    const taskInserted = await tasksRepo.insert(task);
    return taskInserted;
  }

  static async getAllByBoardId(boardId) {
    const tasks = await tasksRepo.getAllByBoardId(boardId);
    return tasks;
  }

  static async getByBoardIdAndTaskId(boardId, taskId) {
    const task = await tasksRepo.getByBoardIdAndTaskId(boardId, taskId);
    return task;
  }

  static async updateById(id, payload) {
    const task = await tasksRepo.getById(id);
    const taskUpdated = await task?.update(payload);
    return taskUpdated;
  }

  static async updateByBoardIdAndTaskId({ boardId, taskId }, payload) {
    const task = await tasksRepo.getByBoardIdAndTaskId(boardId, taskId);
    const taskUpdated = await task?.update(payload);
    return taskUpdated;
  }

  async update(payload) {
    const { title, order, description, userId, boardId, columnId } = payload;
    if (title !== undefined) this.title = title;
    if (order !== undefined) this.order = order;
    if (description !== undefined) this.description = description;
    if (userId !== undefined) this.userId = userId;
    if (boardId !== undefined) this.boardId = boardId;
    if (columnId !== undefined) this.columnId = columnId;

    return this;
  }

  static async findAll(callback) {
    if (typeof callback !== 'function') return null;
    const tasks = await tasksRepo.getAll();
    return tasks.filter(callback);
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  static async deleteByBoardIdAndTaskId(boardId, taskId) {
    const task = await tasksRepo.deleteByBoardIdAndTaskId(boardId, taskId);
    return task;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
