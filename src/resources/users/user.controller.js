const { StatusCodes } = require('http-status-codes');
const User = require('./user.model');

const usersService = require('./user.service');

exports.create = async (req, res) => {
  const user = await usersService.create(req.body);
  return res.status(StatusCodes.CREATED).json(User.toResponse(user));
};

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();
  return res.status(StatusCodes.OK).json(users.map(User.toResponse));
};

exports.getById = async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
  return res.status(StatusCodes.OK).json(User.toResponse(user));
};
