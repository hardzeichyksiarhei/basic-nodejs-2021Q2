const { StatusCodes } = require('http-status-codes');
const User = require('./user.model');

const usersService = require('./user.service');

exports.create = async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(StatusCodes.CREATED).json(User.toResponse(user));
};

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();
  res.status(StatusCodes.OK).json(users.map(User.toResponse));
};
