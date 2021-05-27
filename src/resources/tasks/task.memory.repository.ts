/**
 * @file   This file define the tasks memory repository
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Tasks
 */

import db from '../../db';

import { TTask } from './task.type';

const { tasks } = db;

/**
 * Adds an task object to the end of the tasks collection
 * @param {TTask} task The task to add in repository
 * @returns {Promise<TTask>} The task who was added to the repository
 */
const add = async (task: TTask): Promise<TTask> => {
  tasks.push(task);
  return task;
};

/**
 * Gets all tasks
 * @returns {Promise<TTask[]>} The tasks array
 */
const all = async (): Promise<TTask[]> => tasks;

/**
 * Removes a single task by its id field
 * @param {TTask} task The task object
 * @returns {Promise<?TTask>} The task object or null
 */
const remove = async ({ id }: TTask): Promise<TTask | null> => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return null;
  const taskDeletable = tasks[idx]!;
  tasks.splice(idx, 1);
  return taskDeletable;
};

export default { add, all, remove };
