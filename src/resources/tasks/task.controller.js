const { StatusCodes } = require('http-status-codes');
const Task = require('./task.model');

const catchErrors = require('../../common/catchErrors');
const tasksService = require('./task.service');

exports.create = catchErrors(async (req, res) => {
  const task = await tasksService.create(req.body);
  if (!task) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ code: 'TASK_NOT_CREATE', msg: 'Task not create' });
  }
  return res.status(StatusCodes.CREATED).json(Task.toResponse(task));
});

exports.getAll = catchErrors(async (req, res) => {
  const tasks = await tasksService.getAll();
  return res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
});

exports.getById = catchErrors(async (req, res) => {
  const task = await tasksService.getById(req.params.taskId);
  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
  }
  return res.status(StatusCodes.OK).json(Task.toResponse(task));
});

exports.updateById = catchErrors(async (req, res) => {
  const task = await tasksService.updateById(req.params.taskId, req.body);
  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
  }
  return res.status(StatusCodes.OK).json(task && Task.toResponse(task));
});

exports.deleteById = catchErrors(async (req, res) => {
  const task = await tasksService.deleteById(req.params.taskId);
  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
  }
  return res.status(StatusCodes.OK).json(Task.toResponse(task));
});
