const { StatusCodes } = require('http-status-codes');
const Task = require('./task.model');

const catchErrors = require('../../common/catchErrors');
const tasksService = require('./task.service');

exports.create = catchErrors(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create(boardId, req.body);
  if (!task) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ code: 'TASK_NOT_CREATE', msg: 'Task not create' });
  }
  return res.status(StatusCodes.CREATED).json(Task.toResponse(task));
});

exports.getAllByBoardId = catchErrors(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAllByBoardId(boardId);
  return res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
});

exports.getByBoardIdAndTaskId = catchErrors(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.getByBoardIdAndTaskId(boardId, taskId);
  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
  }
  return res.status(StatusCodes.OK).json(Task.toResponse(task));
});

exports.updateByBoardIdAndTaskId = catchErrors(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.updateByBoardIdAndTaskId(
    boardId,
    taskId,
    req.body
  );
  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
  }
  return res.status(StatusCodes.OK).json(task && Task.toResponse(task));
});

exports.deleteByBoardIdAndTaskId = catchErrors(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.deleteByBoardIdAndTaskId(boardId, taskId);
  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
  }
  return res.status(StatusCodes.OK).json(Task.toResponse(task));
});
