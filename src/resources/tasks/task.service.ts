/**
 * @file   This file define the task services
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Tasks
 */

import Task from './task.model';

import { ITask, IBaseTask, IBaseTaskPartial } from './task.type';

/**
 * Creates a task instance
 * @param {string} boardId The id of the board
 * @param {IBaseTask} payload The task object for create
 * @returns {Promise<ITask>} The task object
 */
const create = async (boardId: string, payload: IBaseTask): Promise<ITask> => {
  const taskCreatable = { ...payload, boardId };
  return Task.create(taskCreatable);
};

/**
 * Gets all tasks by its boardId and taskId fields
 * @param {string} boardId The id of the board
 * @returns {Promise<ITask[]>} The tasks array
 */
const getAllByBoardId = async (boardId: string): Promise<ITask[]> => Task.getAllByBoardId(boardId);

/**
 * Gets a single task by its boardId and taskId fields
 * @param {string} boardId The id of the board
 * @param {string} taskId The id of the task
 * @returns {Promise<?ITask>} The task object
 */
const getByBoardIdAndTaskId = async (boardId: string, taskId: string): Promise<ITask | null> =>
  Task.getByBoardIdAndTaskId(boardId, taskId);

/**
 * Updates a single task by boardId and taskId fields
 * @param {string} boardId The id of the board
 * @param {string} taskId The id of the task
 * @param {IBaseTaskPartial} payload The task object for update
 * @returns {Promise<?ITask>} The task object
 */
const updateByBoardIdAndTaskId = async (
  boardId: string,
  taskId: string,
  payload: IBaseTaskPartial
): Promise<ITask | null> => Task.updateByBoardIdAndTaskId(boardId, taskId, payload);

/**
 * Deletes a single task by boardId and taskId fields
 * @param {string} boardId The id of the board
 * @param {string} taskId The id of the task
 * @returns {Promise<?ITask>} The task object or null
 */
const deleteByBoardIdAndTaskId = async (boardId: string, taskId: string): Promise<ITask | null> =>
  Task.deleteByBoardIdAndTaskId(boardId, taskId);

export default {
  create,
  getAllByBoardId,
  getByBoardIdAndTaskId,
  updateByBoardIdAndTaskId,
  deleteByBoardIdAndTaskId,
};
