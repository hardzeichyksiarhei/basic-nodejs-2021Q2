import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import AppError from '../../classes/appError.class';
import Task from './task.model';

import tasksService from './task.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const task = await tasksService.create(boardId, req.body);
  if (!task) {
    throw new AppError('Task not create', StatusCodes.BAD_REQUEST, 'TASK_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(Task.toResponse(task));
});

const getAllByBoardId = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAllByBoardId(boardId);
  return res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
});

const getByBoardIdAndTaskId = asyncHandler(async (req: Request, res: Response) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.getByBoardIdAndTaskId(boardId, taskId);
  if (!task) {
    throw new AppError('Task not found', StatusCodes.NOT_FOUND, 'TASK_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Task.toResponse(task));
});

const updateByBoardIdAndTaskId = asyncHandler(async (req: Request, res: Response) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.updateByBoardIdAndTaskId(boardId, taskId, req.body);
  if (!task) {
    throw new AppError('Task not found', StatusCodes.NOT_FOUND, 'TASK_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(task && Task.toResponse(task));
});

const deleteByBoardIdAndTaskId = asyncHandler(async (req: Request, res: Response) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.deleteByBoardIdAndTaskId(boardId, taskId);
  if (!task) {
    throw new AppError('Task not found', StatusCodes.NOT_FOUND, 'TASK_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Task.toResponse(task));
});

export default {
  create,
  getAllByBoardId,
  getByBoardIdAndTaskId,
  updateByBoardIdAndTaskId,
  deleteByBoardIdAndTaskId,
};
