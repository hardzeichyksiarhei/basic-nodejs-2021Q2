const { StatusCodes } = require('http-status-codes');
const User = require('./user.model');

const usersService = require('./user.service');

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();
  res.status(StatusCodes.OK).json(users.map(User.toResponse));
};
