const { StatusCodes } = require('http-status-codes');
const User = require('./user.model');

const catchErrors = require('../../common/catchErrors');
const usersService = require('./user.service');

exports.create = catchErrors(async (req, res) => {
  const user = await usersService.create(req.body);
  return res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

exports.getAll = catchErrors(async (req, res) => {
  const users = await usersService.getAll();
  return res.status(StatusCodes.OK).json(users.map(User.toResponse));
});

exports.getById = catchErrors(async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
  return res.status(StatusCodes.OK).json(User.toResponse(user));
});

exports.updateById = catchErrors(async (req, res) => {
  const user = await usersService.updateById(req.params.userId, req.body);
  if (user === -1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
  return res.status(StatusCodes.OK).json(user && User.toResponse(user));
});

exports.deleteById = catchErrors(async (req, res) => {
  const user = await usersService.deleteById(req.params.userId);
  if (user === -1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
  return res.status(StatusCodes.OK).json(User.toResponse(user));
});
