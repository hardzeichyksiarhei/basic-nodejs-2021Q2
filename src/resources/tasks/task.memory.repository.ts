/**
 * @file   This file define the tasks memory repository
 * @author hardz
 * @since  1.0.0
 *
 * @namespace Tasks
 */

import db from '../../db';

import { ITask } from './task.type';

const { tasks } = db;

/**
 * Adds an task object to the end of the tasks collection
 * @param task The task to add in repository
 * @returns The task who was added to the repository
 */
const add = async (task: ITask): Promise<ITask> => {
  tasks.push(task);
  return task;
};

/**
 * Gets all tasks
 * @returns The tasks array
 */
const all = async (): Promise<ITask[]> => tasks;

/**
 * Removes a single task by its id field
 * @param task The task object
 * @returns The task object or null
 */
const remove = async ({ id }: ITask): Promise<ITask | null> => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return null;
  const taskDeletable = tasks[idx]!;
  tasks.splice(idx, 1);
  return taskDeletable;
};

export default { add, all, remove };
