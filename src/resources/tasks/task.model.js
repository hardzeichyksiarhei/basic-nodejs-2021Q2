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

  static async updateByBoardIdAndTaskId({ boardId, taskId }, payload) {
    const task = await tasksRepo.getByBoardIdAndTaskId(boardId, taskId);
    const taskUpdated = task?.update(payload);
    return taskUpdated;
  }

  async update(payload) {
    const { title, order, description, userId, boardId, columnId } = payload;
    if (title) this.title = title;
    if (order) this.order = order;
    if (description) this.description = description;
    if (userId) this.userId = userId;
    if (boardId) this.boardId = boardId;
    if (columnId) this.columnId = columnId;

    return this;
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
