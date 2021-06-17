import { getCustomRepository } from 'typeorm';
import Task from './task.entity';

import { TaskRepository } from './task.repository';

const create = async (boardId: string, payload: Omit<Task, 'id'>): Promise<Task> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const taskCreatable = { ...payload, boardId };
  const task = taskRepository.createTask(taskCreatable);
  return taskRepository.save(task);
};

const getAllByBoardId = async (boardId: string): Promise<Task[]> => {
  const taskRepository = getCustomRepository(TaskRepository);
  return taskRepository.getAllTasksByBoardId(boardId);
};

const getByBoardIdAndTaskId = async (boardId: string, taskId: string): Promise<Task | null> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const task = await taskRepository.getTaskByBoardIdAndTaskId(boardId, taskId);
  if (!task) return null;
  return task;
};

const updateByBoardIdAndTaskId = async (
  boardId: string,
  taskId: string,
  payload: Partial<Omit<Task, 'id'>>
): Promise<Task | null> => {
  const taskRepository = getCustomRepository(TaskRepository);
  await taskRepository.updateTaskByBoardIdAndTaskId(boardId, taskId, payload);
  const task = await taskRepository.getTaskByBoardIdAndTaskId(boardId, taskId);
  if (!task) return null;
  return task;
};

const deleteByBoardIdAndTaskId = async (boardId: string, taskId: string): Promise<Task | null> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const taskDeletable = await taskRepository.getTaskByBoardIdAndTaskId(boardId, taskId);
  if (!taskDeletable) return null;

  await taskRepository.deleteTaskByBoardIdAndTaskId(boardId, taskId);

  return taskDeletable;
};

export default {
  create,
  getAllByBoardId,
  getByBoardIdAndTaskId,
  updateByBoardIdAndTaskId,
  deleteByBoardIdAndTaskId,
};
