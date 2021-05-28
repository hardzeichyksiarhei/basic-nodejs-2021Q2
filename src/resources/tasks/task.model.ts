/**
 * @file   This file define the Task class
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Tasks
 */

import { v4 as uuid } from 'uuid';

import tasksRepo from './task.memory.repository';
import { ITask, IBaseTask, IBaseTaskPartial, IBaseTaskResponse } from './task.type';

/** Class representing a Task model */
class Task implements ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;

  /**
   * Creates a task instance
   * @param {ITask} task The task object
   */
  constructor({
    title = 'TASK',
    order = -1,
    description = '',
    userId = null,
    boardId = null,
    columnId = null,
  }: IBaseTaskPartial = {}) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Creates a task instance and adds to the tasks collection
   * @param {IBaseTask} payload The task object for create
   * @returns {Promise<ITask>} The task object
   */
  static async create(payload: IBaseTask): Promise<ITask> {
    const task = new Task(payload);
    const taskAdded = await tasksRepo.add(task);
    return taskAdded;
  }

  /**
   * Gets a single task by its id field
   * @param {string} id The id of the task
   * @returns {Promise<?ITask>} The task object
   */
  static async getById(id: string): Promise<ITask | null> {
    const tasks = await tasksRepo.all();
    const idx = tasks.findIndex((task) => task.id === id);
    if (idx === -1) return null;
    return tasks[idx]!;
  }

  /**
   * Gets all tasks by its boardId and taskId fields
   * @param {string} boardId The id of the board
   * @returns {Promise<ITask[]>} The tasks array
   */
  static async getAllByBoardId(boardId: string): Promise<ITask[]> {
    const tasks = await tasksRepo.all();
    return tasks.filter((task) => task.boardId === boardId);
  }

  /**
   * Gets a single task by its boardId and taskId fields
   * @param {string} boardId The id of the board
   * @param {string} taskId The id of the task
   * @returns {Promise<?ITask>} The task object or null
   */
  static async getByBoardIdAndTaskId(boardId: string, taskId: string): Promise<ITask | null> {
    const tasks = await tasksRepo.all();
    const idx = tasks.findIndex((task) => task.boardId === boardId && task.id === taskId);
    if (idx === -1) return null;
    return tasks[idx]!;
  }

  /**
   * Updates a single task by its id field
   * @param {string} id The id of the task
   * @param {IBaseTaskPartial} payload The task object for update
   * @returns {Promise<?ITask>} The task object or null
   */
  static async updateById(id: string, payload: IBaseTaskPartial): Promise<ITask | null> {
    const task = await Task.getById(id);
    if (!task) return null;
    return (task as ITask).update(payload);
  }

  /**
   * Updates a single task by boardId and taskId fields
   * @param {string} boardId The id of the board
   * @param {string} taskId The id of the task
   * @param {IBaseTaskPartial} payload The task object for update
   * @returns {Promise<?ITask>} The task object or null
   */
  static async updateByBoardIdAndTaskId(
    boardId: string,
    taskId: string,
    payload: IBaseTaskPartial
  ): Promise<ITask | null> {
    const task = await Task.getByBoardIdAndTaskId(boardId, taskId);
    if (!task) return null;
    return (task as ITask).update(payload);
  }

  /**
   * Updates a task
   * @param {IBaseTaskPartial} payload The task object for update
   * @returns {Promise<ITask>} The task object
   */
  async update(payload: IBaseTaskPartial): Promise<ITask> {
    const { title, order, description, userId, boardId, columnId } = payload;
    if (title !== undefined) this.title = title;
    if (order !== undefined) this.order = order;
    if (description !== undefined) this.description = description;
    if (userId !== undefined) this.userId = userId;
    if (boardId !== undefined) this.boardId = boardId;
    if (columnId !== undefined) this.columnId = columnId;

    return this;
  }

  /**
   * Retrieves all the elements that match the conditions defined by the specified predicate
   * @param {Function} callback The predicate that defines the conditions of the elements to search for
   * @returns {Promise<ITask>} A array containing all the elements that match the conditions defined by the specified predicate, if found; otherwise, an empty array
   */
  static async findAll(callback: {
    (value: ITask, index?: number, array?: ITask[]): boolean;
  }): Promise<ITask[]> {
    if (typeof callback !== 'function') return [];
    const tasks = await tasksRepo.all();
    return tasks.filter(callback);
  }

  /**
   * Deletes a single task by boardId and taskId fields
   * @param {string} boardId The id of the board
   * @param {string} taskId The id of the task
   * @returns {Promise<?ITask>} The task object or null
   */
  static async deleteByBoardIdAndTaskId(boardId: string, taskId: string): Promise<ITask | null> {
    const task = await Task.getByBoardIdAndTaskId(boardId, taskId);
    if (!task) return null;
    return tasksRepo.remove(task);
  }

  /**
   * Gets a single task for API response
   * @param {ITask} task The task object
   * @returns {IBaseTaskResponse} The task object for response
   */
  static toResponse(task: ITask): IBaseTaskResponse {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

export default Task;
