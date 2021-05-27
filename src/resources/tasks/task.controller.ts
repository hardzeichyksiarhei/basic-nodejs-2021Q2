import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Task from './task.model';
import { TTask } from './task.type';

import tasksService from './task.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const task = await tasksService.create(boardId!, req.body);
  if (!task) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ code: 'TASK_NOT_CREATE', msg: 'Task not create' });
  }
  return res.status(StatusCodes.CREATED).json(Task.toResponse(task));
});

const getAllByBoardId = asyncHandler(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAllByBoardId(boardId!);
  return res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
});

const getByBoardIdAndTaskId = asyncHandler(
  async (req: Request, res: Response) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getByBoardIdAndTaskId(boardId!, taskId!);
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
    return res.status(StatusCodes.OK).json(Task.toResponse(task));
  }
);

const updateByBoardIdAndTaskId = asyncHandler(
  async (req: Request, res: Response) => {
    const { boardId, taskId } = req.params;
    const payload: TTask = req.body;
    const task = await tasksService.updateByBoardIdAndTaskId(
      boardId!,
      taskId!,
      payload
    );
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
    return res.status(StatusCodes.OK).json(task && Task.toResponse(task));
  }
);

const deleteByBoardIdAndTaskId = asyncHandler(
  async (req: Request, res: Response) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.deleteByBoardIdAndTaskId(boardId!, taskId!);
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
    return res.status(StatusCodes.OK).json(Task.toResponse(task));
  }
);

export default {
  create,
  getAllByBoardId,
  getByBoardIdAndTaskId,
  updateByBoardIdAndTaskId,
  deleteByBoardIdAndTaskId,
};
